const axios = require('axios');

class EmailService {
    constructor() {
        this.geminiApiUrl = process.env.GEMINI_URL;
        this.geminiApiKey = process.env.GEMINI_KEY;
        
        if (!this.geminiApiUrl || !this.geminiApiKey) {
            console.warn('Warning: Gemini API URL or Key not configured');
        }
    }

    async generateEmailReply(emailRequest) {
        try {
            // Build the prompt
            const prompt = this.buildPrompt(emailRequest);

            // Craft the request body
            const requestBody = {
                contents: [
                    {
                        parts: [
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            };

            // Log for debugging (similar to Spring Boot version)
            console.log('Request Body:', JSON.stringify(requestBody, null, 2));
            console.log('API URL:', this.geminiApiUrl + this.geminiApiKey);

            // Make the API call
            const response = await axios.post(
                this.geminiApiUrl + this.geminiApiKey,
                requestBody,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Extract and return the response content
            return this.extractResponseContent(response.data);

        } catch (error) {
            console.error('Error calling Gemini API:', error);
            throw new Error(`Failed to generate email: ${error.message}`);
        }
    }

    extractResponseContent(response) {
        try {
            // Navigate through the response structure
            const candidates = response.candidates;
            if (!candidates || candidates.length === 0) {
                throw new Error('No candidates in response');
            }

            const content = candidates[0].content;
            if (!content || !content.parts || content.parts.length === 0) {
                throw new Error('No content parts in response');
            }

            return content.parts[0].text;

        } catch (error) {
            console.error('Error processing response:', error);
            return `Error processing response: ${error.message}`;
        }
    }

    buildPrompt(emailRequest) {
        let prompt = ' Generate a proper professional email reply, for the following email content. please dont generate a subject line. ';
        
        // Check if tone is provided and not empty
        if (emailRequest.tone && emailRequest.tone.trim() !== '') {
            prompt += `Use a ${emailRequest.tone} tone.`;
        }
        
        prompt += `\nOriginal email content: \n${emailRequest.emailContent}`;
        
        return prompt;
    }
}

module.exports = new EmailService();
