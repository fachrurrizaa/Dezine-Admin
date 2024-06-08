import { google } from 'googleapis';

const sheets = google.sheets('v4');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { Name, Email, Message } = req.body;

    try {
      // Set up Google Sheets API credentials
      const auth = new google.auth.JWT(
        process.env.GOOGLE_CLIENT_EMAIL,
        null,
        process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        ['https://www.googleapis.com/auth/spreadsheets']
      );

      // Append the new row to the Google Sheet
      const response = sheets.spreadsheets.values.append({
        auth,
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'ContactUs!A:C', // Use entire columns A to C
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [[Name, Email, Message]],
        },
      });

      res.status(200).json({ message: 'Success', response });
    } catch (error) {
      console.error('Error writing to Google Sheets:', error);
      res.status(500).json({ error: 'Error writing to Google Sheets' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
