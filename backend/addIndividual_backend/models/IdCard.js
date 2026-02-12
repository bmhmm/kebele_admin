const mongoose = require('mongoose');

const idCardSchema = new mongoose.Schema({
  // Link to existing individual
  individualId: {
    type: String, // or Number depending on your individual ID format
    required: [true, 'Individual ID is required'],
    ref: 'Individual'
  },
  
  // ID Card Specific Fields
  idNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  
  cardType: {
    type: String,
    enum: ['standard', 'premium', 'temporary', 'student', 'senior'],
    default: 'standard'
  },
  
  issueDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  
  expiryDate: {
    type: Date,
    required: [true, 'Expiry date is required']
  },
  
  issuingAuthority: {
    type: String,
    default: 'ID Card Management System'
  },
  
  // Card Status
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended', 'expired', 'pending', 'lost', 'stolen'],
    default: 'pending'
  },
  
  // Card Features
  hasPhoto: {
    type: Boolean,
    default: false
  },
  
  hasQRCode: {
    type: Boolean,
    default: true
  },
  
  qrCodeData: String,
  
  // Physical Card Details
  cardSerialNumber: String,
  printedAt: Date,
  
  // Metadata
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Notes
  notes: String,
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
idCardSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Indexes for efficient searching
idCardSchema.index({ individualId: 1 });
idCardSchema.index({ idNumber: 1 });
idCardSchema.index({ status: 1 });
idCardSchema.index({ issueDate: -1 });
idCardSchema.index({ expiryDate: 1 });

const IdCard = mongoose.model('IdCard', idCardSchema);
module.exports = IdCard;