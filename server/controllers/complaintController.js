const Complaint = require('../models/Complaint');

const allowedFilters = ['status', 'wasteType'];

exports.getComplaints = async (req, res, next) => {
  try {
    const filters = {};
    allowedFilters.forEach((key) => {
      if (!req.query[key]) return;
      // Accept the shorter API filter used in the lab sheet (for example,
      // `Plastic`) while retaining the existing UI values (`Plastic Waste`).
      filters[key] = key === 'wasteType' && !req.query[key].endsWith('Waste')
        ? `${req.query[key]} Waste`
        : req.query[key];
    });
    const complaints = await Complaint.find(filters).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) { next(error); }
};

exports.getComplaintById = async (req, res, next) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found.' });
    res.json(complaint);
  } catch (error) { next(error); }
};

exports.createComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.create(req.body);
    res.status(201).json(complaint);
  } catch (error) { next(error); }
};

exports.updateComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!complaint) return res.status(404).json({ message: 'Complaint not found.' });
    res.json(complaint);
  } catch (error) { next(error); }
};

exports.deleteComplaint = async (req, res, next) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found.' });
    res.status(204).send();
  } catch (error) { next(error); }
};
