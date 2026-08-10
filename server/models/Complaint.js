const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  citizenName: { type: String, required: [true, 'Citizen name is required.'], trim: true },
  location: { type: String, required: [true, 'Location is required.'], trim: true },
  wasteType: { type: String, required: [true, 'Waste type is required.'], enum: ['Organic Waste', 'Plastic Waste', 'E-Waste', 'Hazardous Waste'] },
  priority: { type: String, required: [true, 'Priority is required.'], enum: ['High', 'Medium', 'Low'] },
  description: { type: String, required: [true, 'Description is required.'], trim: true, minlength: [10, 'Description must contain at least 10 characters.'] },
  status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' }
}, { timestamps: { createdAt: true, updatedAt: true }, versionKey: false, toJSON: { virtuals: true } });

module.exports = mongoose.model('Complaint', complaintSchema);
