const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// POST /api/email/generate
router.post('/generate', emailController.generateEmailReply);

module.exports = router;