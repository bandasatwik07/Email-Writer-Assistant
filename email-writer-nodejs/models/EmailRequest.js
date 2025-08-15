/**
 * EmailRequest model
 * Represents the structure of an email generation request
 */
class EmailRequest {
    constructor(emailContent, tone = null) {
        this.emailContent = emailContent;
        this.tone = tone;
    }

    /**
     * Validates the email request
     * @returns {boolean} true if valid, false otherwise
     */
    isValid() {
        return this.emailContent && typeof this.emailContent === 'string' && this.emailContent.trim().length > 0;
    }

    /**
     * Creates an EmailRequest from a plain object
     * @param {Object} obj - Plain object with emailContent and tone properties
     * @returns {EmailRequest} EmailRequest instance
     */
    static fromObject(obj) {
        if (!obj) {
            throw new Error('Email request object is required');
        }
        return new EmailRequest(obj.emailContent, obj.tone);
    }

    /**
     * Converts the EmailRequest to a plain object
     * @returns {Object} Plain object representation
     */
    toObject() {
        return {
            emailContent: this.emailContent,
            tone: this.tone
        };
    }
}

module.exports = EmailRequest;
