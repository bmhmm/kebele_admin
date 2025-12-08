// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve static files from uploads directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Routes
// app.use('/api/individuals', require('./routes/individuals'));

// // Health check route
// app.get('/api/health', (req, res) => {
//   res.json({ 
//     success: true, 
//     message: 'Kebele System API is running', 
//     timestamp: new Date().toISOString() 
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Error:', err);
  
//   if (err instanceof multer.MulterError) {
//     if (err.code === 'LIMIT_FILE_SIZE') {
//       return res.status(400).json({
//         success: false,
//         message: 'File size must be less than 5MB'
//       });
//     }
//   }
  
//   res.status(500).json({
//     success: false,
//     message: 'Internal server error'
//   });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found'
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   console.log(`Health check: http://localhost:${PORT}/api/health`);
// });






// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve static files from uploads directory
// const uploadsDir = path.join(__dirname, 'uploads');
// app.use('/uploads', express.static(uploadsDir));

// // Log uploads directory status
// if (fs.existsSync(uploadsDir)) {
//   console.log('Uploads directory is available at:', uploadsDir);
// } else {
//   console.log('Uploads directory not found, it will be created when first upload occurs');
// }

// // Routes
// app.use('/api/individuals', require('./routes/individuals'));

// // Health check route
// app.get('/api/health', (req, res) => {
//   res.json({ 
//     success: true, 
//     message: 'Kebele System API is running', 
//     timestamp: new Date().toISOString(),
//     uploadsDir: uploadsDir,
//     uploadsDirExists: fs.existsSync(uploadsDir)
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Error:', err);
  
//   // Multer errors
//   if (err.code === 'LIMIT_FILE_SIZE') {
//     return res.status(400).json({
//       success: false,
//       message: 'File size must be less than 5MB'
//     });
//   }
  
//   if (err.code === 'LIMIT_UNEXPECTED_FILE') {
//     return res.status(400).json({
//       success: false,
//       message: 'Unexpected field for file upload'
//     });
//   }
  
//   if (err.message.includes('Invalid file type')) {
//     return res.status(400).json({
//       success: false,
//       message: err.message
//     });
//   }
  
//   // General error
//   res.status(500).json({
//     success: false,
//     message: 'Internal server error'
//   });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found'
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   console.log(`Health check: http://localhost:${PORT}/api/health`);
//   console.log(`Uploads directory: ${uploadsDir}`);
// });






const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());

// adding today

// Enable CORS for all routes
//////////////////////////////
//////////////////////////'
///////////////////////////////////


app.use(cors({
  origin: 'http://localhost:5173', // Your React app URL
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

///////////////////////////
//////////////////////////
/////////////////////////
// ending the cors adding today

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsDir));

// Log uploads directory status
if (fs.existsSync(uploadsDir)) {
  console.log('Uploads directory is available at:', uploadsDir);
} else {
  console.log('Uploads directory not found, it will be created when first upload occurs');
}

// Routes
app.use('/api/individuals', require('./routes/individuals'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Kebele System API is running', 
    timestamp: new Date().toISOString(),
    uploadsDir: uploadsDir,
    uploadsDirExists: fs.existsSync(uploadsDir)
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File size must be less than 5MB'
    });
  }
  
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      success: false,
      message: 'Unexpected field for file upload'
    });
  }
  
  if (err.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  
  // General error
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// CORRECT 404 handler - Fix the wildcard pattern
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Uploads directory: ${uploadsDir}`);
});









