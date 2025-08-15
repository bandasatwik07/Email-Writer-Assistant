const express = require('express');
const router = express.Router();
const emailService = require('../services/emailService');

// POST /api/email/generate
const generateEmailReply = async (req, res) => {
    try {
        const emailRequest = req.body;
        
        // Validate request body
        if (!emailRequest || !emailRequest.emailContent) {
            return res.status(400).json({ 
                error: 'Email content is required' 
            });
        }

        const response = await emailService.generateEmailReply(emailRequest);
        res.status(200).json({ response });
        
    } catch (error) {
        console.error('Error generating email:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
};

module.exports = {
    generateEmailReply
};
