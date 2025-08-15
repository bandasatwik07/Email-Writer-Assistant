# Email Writer Node.js Backend

A Node.js backend service for generating AI-powered email replies using Google's Gemini API. This is the Node.js equivalent of the Spring Boot backend.

## Features

- RESTful API for email generation
- Integration with Google Gemini AI
- CORS enabled for cross-origin requests
- Professional email reply generation with customizable tone
- Input validation and error handling

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Google Gemini API key

## Installation

1. Clone the repository and navigate to the Node.js backend folder:
   ```bash
   cd email-writer-nodejs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp env.example .env
   ```
   
   Edit the `.env` file and add your actual values:
   ```
   PORT=8080
   GEMINI_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=
   GEMINI_KEY=your_actual_gemini_api_key_here
   ```

## Running the Application

### Development mode (with auto-restart):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:8080` (or the port specified in your .env file).

## API Endpoints

### Health Check
- **GET** `/health`
- Returns server status

### Generate Email Reply
- **POST** `/api/email/generate`
- **Content-Type**: `application/json`

#### Request Body:
```json
{
  "emailContent": "Original email content here...",
  "tone": "professional" // optional: formal, casual, friendly, etc.
}
```

#### Response:
```json
{
  "response": "Generated email reply..."
}
```

#### Error Response:
```json
{
  "error": "Error message",
  "message": "Detailed error description"
}
```

## Project Structure

```
email-writer-nodejs/
├── controllers/
│   └── emailController.js     # Email API endpoints
├── services/
│   └── emailService.js        # Business logic and Gemini API integration
├── models/
│   └── EmailRequest.js        # Data models
├── server.js                  # Main application entry point
├── package.json               # Dependencies and scripts
├── env.example                # Environment variables template
└── README.md                  # This file
```

## Comparison with Spring Boot Version

This Node.js backend provides identical functionality to the Spring Boot version:

| Feature | Spring Boot | Node.js |
|---------|-------------|---------|
| Framework | Spring Boot | Express.js |
| HTTP Client | WebClient | Axios |
| Dependency Injection | @Service, @Autowired | Module exports/requires |
| Configuration | application.properties | .env file |
| CORS | @CrossOrigin | cors middleware |
| JSON Processing | Jackson | Native JSON |

## Environment Variables

- `PORT`: Server port (default: 8080)
- `GEMINI_URL`: Google Gemini API base URL
- `GEMINI_KEY`: Your Google Gemini API key

## Error Handling

The application includes comprehensive error handling:
- Input validation for required fields
- Gemini API error handling
- Structured error responses
- Console logging for debugging

## Testing

You can test the API using curl, Postman, or any HTTP client:

```bash
curl -X POST http://localhost:8080/api/email/generate \
  -H "Content-Type: application/json" \
  -d '{
    "emailContent": "Hi, I need help with my order",
    "tone": "professional"
  }'
```

## License

ISC
