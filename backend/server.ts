import express from 'express';
import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';
import cors from 'cors';  // Import the CORS package

// Load environment variables from .env file
dotenv.config();

const app = express();

// Flexible CORS configuration to handle the exact origin or any localhost origins
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow: boolean) => void) => {
    if (!origin || origin === 'http://localhost:3000') {
      callback(null, true); // Allow requests from localhost:3000
    } else {
      callback(new Error('CORS not allowed for this origin'), false);
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Enable CORS for all routes
app.use(cors(corsOptions));

type Request = express.Request;
type Response = express.Response;

// Retrieve values from environment variables
const clientId = process.env.CLIENT_ID;
const tenantId = process.env.TENANT_ID;
const redirectUri = process.env.REDIRECT_URI;
const client_secret = process.env.CLIENT_SECRET;
//const scope = process.env.SCOPE;
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle the callback with either GET or POST
app.post('/auth/callback', async (req: Request, res: Response) => {
  const { code } = req.body; // Extract code and code_verifier from the request body

  if (!code) {
    return res.status(400).send('Authorization code not provided');
  }

  const tokenRequestBody = qs.stringify({
    client_id: clientId,
    code: code as string,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
    scope: 'https://graph.microsoft.com/.default',
    client_secret: client_secret
  });

  try {
    // Exchange the authorization code for an access token
    const tokenResponse = await axios.post(
      `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
      tokenRequestBody,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token } = tokenResponse.data;
    
    console.log('access_token retrieved!');

    // Return the access token
    res.json(access_token);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data); // Logs response error details
      res.status(500).json({ error: 'Axios request failed', details: error.response?.data });
    } else if (error instanceof Error) {
      console.error('Error exchanging authorization code:', error.message);
      res.status(500).json({ error: error.message });
    } else {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'Unexpected error occurred' });
    }
  }
});

// Start the server using the port from the .env file
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
