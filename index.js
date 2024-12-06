var express = require('express');
var cors = require('cors');
var multer = require('multer'); // Import multer
require('dotenv').config()

var app = express();

// Enable CORS
app.use(cors());

// Serve static files from the "public" directory
app.use('/public', express.static(process.cwd() + '/public'));

// Set up multer to handle file uploads
const storage = multer.memoryStorage(); // Store file in memory for now
const upload = multer({ storage: storage });

// Serve the index.html page
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Endpoint to handle file uploads and return the file's name, type, and size
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  // Check if the file was uploaded
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Return file details in JSON response
  res.json({
    name: req.file.originalname, // Original file name
    type: req.file.mimetype, // File MIME type
    size: req.file.size // File size in bytes
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
