const express = require('express');
const controller = require('../controllers/complaintController');

const router = express.Router();
router.route('/').get(controller.getComplaints).post(controller.createComplaint);
router.route('/:id').get(controller.getComplaintById).put(controller.updateComplaint).delete(controller.deleteComplaint);

module.exports = router;
