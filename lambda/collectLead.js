const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
const { google } = require('googleapis');

const s3Client = new S3Client();
const BUCKET_NAME = process.env.LEADS_BUCKET;
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_CREDENTIALS = process.env.GOOGLE_CREDENTIALS;

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { email } = JSON.parse(event.body);
    
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid email address' })
      };
    }

    const timestamp = new Date().toISOString();

    // Save to Google Sheets
    if (GOOGLE_SHEET_ID && GOOGLE_CREDENTIALS) {
      await appendToGoogleSheet(email, timestamp);
    }

    // Also save to S3 as backup
    await saveToS3(email, timestamp);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Lead collected successfully' 
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to collect lead' })
    };
  }
};

async function appendToGoogleSheet(email, timestamp) {
  const credentials = JSON.parse(GOOGLE_CREDENTIALS);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });

  const sheets = google.sheets({ version: 'v4', auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: 'Sheet1!A:B',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [[email, timestamp]]
    }
  });
}

async function saveToS3(email, timestamp) {
  const csvLine = `"${email}","${timestamp}"\n`;
  let existingData = 'Email,Timestamp\n';
  
  try {
    const getCommand = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: 'leads.csv'
    });
    const response = await s3Client.send(getCommand);
    existingData = await streamToString(response.Body);
  } catch (err) {
    // File doesn't exist yet
  }

  const updatedData = existingData + csvLine;

  const putCommand = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: 'leads.csv',
    Body: updatedData,
    ContentType: 'text/csv'
  });
  await s3Client.send(putCommand);
}

async function streamToString(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf-8');
}
