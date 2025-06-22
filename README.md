# Chat System - Auto Typer

A full-stack application for managing automated chat personas with realistic typing simulation and message queuing.

## Project Structure

```
assessments/
├── chat-system-backend/     # Express.js API server
├── chat-system-frontend/    # React.js frontend application
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## Features

- **Persona Management**: Create and manage chat personas with custom personalities
- **Message Queue**: Queue messages with realistic typing simulation
- **Real-time Status**: Monitor active users and queue status
- **Configurable Timing**: Adjust typing speed and pause intervals
- **OpenAI Integration**: Generate contextual responses using GPT-3.5-turbo

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd chat-system-backend
npm install

# Install frontend dependencies
cd ../chat-system-frontend
npm install
```

### 2. Environment Configuration

#### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd chat-system-backend
   ```

2. Copy the example environment file:

   ```bash
   cp env.example .env
   ```

3. Edit `.env` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_actual_openai_api_key_here
   ```

#### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd chat-system-frontend
   ```

2. Copy the example environment file:

   ```bash
   cp env.example .env
   ```

3. Edit `.env` if you need to customize the API URL:
   ```env
   REACT_APP_API_BASE_URL=http://localhost:3001
   ```

### 3. Start the Application

#### Development Mode

**Terminal 1 - Backend:**

```bash
cd chat-system-backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd chat-system-frontend
npm start
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

#### Production Mode

**Backend:**

```bash
cd chat-system-backend
npm start
```

**Frontend:**

```bash
cd chat-system-frontend
npm run build
```

## Environment Variables

### Backend (.env)

| Variable                     | Description            | Default               |
| ---------------------------- | ---------------------- | --------------------- |
| `OPENAI_API_KEY`             | Your OpenAI API key    | Required              |
| `PORT`                       | Server port            | 3001                  |
| `NODE_ENV`                   | Environment            | development           |
| `CORS_ORIGIN`                | Allowed CORS origin    | http://localhost:3000 |
| `TYPING_SPEED_MIN`           | Min typing speed (cpm) | 50                    |
| `TYPING_SPEED_MAX`           | Max typing speed (cpm) | 150                   |
| `PAUSE_BETWEEN_MESSAGES_MIN` | Min pause (ms)         | 2000                  |
| `PAUSE_BETWEEN_MESSAGES_MAX` | Max pause (ms)         | 8000                  |
| `MAX_RETRIES`                | Max retry attempts     | 3                     |
| `MAX_QUEUE_SIZE`             | Max queue size         | 1000                  |

### Frontend (.env)

| Variable                 | Description      | Default               |
| ------------------------ | ---------------- | --------------------- |
| `REACT_APP_API_BASE_URL` | Backend API URL  | http://localhost:3001 |
| `REACT_APP_API_TIMEOUT`  | API timeout (ms) | 10000                 |
| `REACT_APP_NODE_ENV`     | Environment      | development           |

## API Endpoints

### Personas

- `POST /api/personas` - Create a new persona
- `GET /api/personas` - Get all personas
- `GET /api/personas/:id` - Get a specific persona
- `PUT /api/personas/:id` - Update a persona

### Messages

- `POST /api/messages/process` - Process a message with persona response

### Queue

- `GET /api/queue/status` - Get queue status and messages

### Users

- `POST /api/users/:userId/activity` - Update user activity
- `GET /api/users/active` - Get active users

### System

- `GET /api/health` - Health check
- `GET /api/settings` - Get current settings
- `PUT /api/settings` - Update settings

## Development

### Backend Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (not implemented yet)

### Frontend Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Security Notes

- Never commit your `.env` files to version control
- Keep your OpenAI API key secure
- The `.gitignore` file is configured to exclude sensitive files
- Use environment variables for all configuration

## Troubleshooting

### Common Issues

1. **OpenAI API Key Error**

   - Ensure your API key is correctly set in the `.env` file
   - Verify the key has sufficient credits

2. **CORS Errors**

   - Check that `CORS_ORIGIN` in backend `.env` matches your frontend URL
   - Ensure both servers are running

3. **Port Already in Use**

   - Change the `PORT` in backend `.env` file
   - Update `REACT_APP_API_BASE_URL` in frontend `.env` accordingly

4. **Module Not Found Errors**
   - Run `npm install` in both directories
   - Clear `node_modules` and reinstall if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
