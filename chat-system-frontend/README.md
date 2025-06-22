# Auto Typer Dashboard Frontend

A React-based dashboard for managing automated chat personas and message processing.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── StatCard.js     # Dashboard statistics card
│   ├── ActivityItem.js # Activity list item
│   ├── PersonaCard.js  # Persona display card
│   ├── PersonaForm.js  # Persona creation/editing form
│   └── index.js        # Component exports
├── pages/              # Route components
│   ├── DashboardPage.js # Main dashboard view
│   ├── PersonasPage.js  # Persona management
│   ├── TestPage.js      # Response testing
│   ├── SettingsPage.js  # Application settings
│   └── index.js         # Page exports
├── layouts/            # Layout components
│   └── DashboardLayout.js # Main dashboard layout
├── hooks/              # Custom React hooks
│   ├── usePersonas.js     # Persona data management
│   ├── useQueueStatus.js  # Queue status with polling
│   ├── useActiveUsers.js  # Active users with polling
│   └── index.js           # Hook exports
├── utils/              # Utility functions
│   └── api.js          # API configuration and requests
└── App.js              # Main application component
```

## Features

### Components

- **StatCard**: Reusable dashboard statistics display
- **ActivityItem**: Consistent activity list items
- **PersonaCard**: Persona information display with edit capability
- **PersonaForm**: Form for creating and editing personas

### Pages

- **DashboardPage**: Overview with statistics and recent activity
- **PersonasPage**: Persona management with creation and editing
- **TestPage**: Test persona responses with real-time feedback
- **SettingsPage**: Application configuration (placeholder)

### Hooks

- **usePersonas**: Manages persona data with CRUD operations
- **useQueueStatus**: Real-time queue status with automatic polling
- **useActiveUsers**: Active users tracking with automatic polling

### Layout

- **DashboardLayout**: Consistent layout with navigation and header

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

3. The application will be available at `http://localhost:3000`

## API Integration

The application expects a backend API running on `http://localhost:3001` with the following endpoints:

- `GET /api/personas` - Fetch all personas
- `POST /api/personas` - Create a new persona
- `GET /api/queue/status` - Get queue status
- `GET /api/users/active` - Get active users
- `POST /api/messages/process` - Process a test message

## Routing

The application uses React Router for navigation:

- `/` - Redirects to `/dashboard`
- `/dashboard` - Main dashboard view
- `/personas` - Persona management
- `/test` - Response testing
- `/settings` - Application settings

## State Management

The application uses React hooks for state management:

- **Local State**: Component-specific state using `useState`
- **Custom Hooks**: Reusable data fetching and management logic
- **API Integration**: Centralized API utilities for consistent requests

## Styling

The application uses Tailwind CSS for styling with custom CSS classes defined in `App.css`.

## Development

### Adding New Components

1. Create the component in the appropriate directory
2. Export it from the corresponding `index.js` file
3. Import and use it in your pages

### Adding New Pages

1. Create the page component in `src/pages/`
2. Add the route in `App.js`
3. Add navigation item in `DashboardLayout.js`

### Adding New Hooks

1. Create the hook in `src/hooks/`
2. Export it from `hooks/index.js`
3. Use it in your components

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Contributing

1. Follow the existing component structure
2. Use the established naming conventions
3. Ensure components are reusable and well-documented
4. Test your changes thoroughly
