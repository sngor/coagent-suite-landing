const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client();
const BUCKET_NAME = process.env.LEADS_BUCKET;

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
    const csvLine = `"${email}","${timestamp}"\n`;

    // Try to get existing CSV
    let existingData = 'Email,Timestamp\n';
    try {
      const getCommand = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: 'leads.csv'
      });
      const response = await s3Client.send(getCommand);
      existingData = await streamToString(response.Body);
    } catch (err) {
      // File doesn't exist yet, use header only
    }

    // Append new lead
    const updatedData = existingData + csvLine;

    // Save back to S3
    const putCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: 'leads.csv',
      Body: updatedData,
      ContentType: 'text/csv'
    });
    await s3Client.send(putCommand);

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

async function streamToString(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf-8');
}
