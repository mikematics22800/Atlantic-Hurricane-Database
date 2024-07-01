// Import necessary modules
import express from 'express';
import cors from 'cors'; // Import cors module
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Define __dirname and __filename for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001; // Define the port

const app = express(); // Create an Express.js server

app.use(cors()); // Enable CORS for all routes and origins
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static('public')); // Middleware to serve static files from '/public'

// Serve hurdat2 to the client
app.get('/:year', (req, res) => {
  const year = req.params.year; // Extract the year from the request URL
  const filePath = path.join(__dirname, `./hurdat2/${year}.json`); // Construct the file path dynamically based on the year

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(404).send('File not found'); // Send a 404 error if the file does not exist
    }
    try {
      const jsonData = JSON.parse(data); // Try to parse the JSON data
      res.json(jsonData); // Send the parsed data to the client
    } catch (parseError) {
      console.error(parseError);
      res.status(500).send('Error parsing JSON data'); // Send a 500 error if parsing fails
    }
  });
});

// Listen on the specified port
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));