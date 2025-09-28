# Lovable Clone - AI-Powered Web Development Platform

A modern web development platform that allows users to create web applications through natural language descriptions, similar to lovable.dev.

## Features

### Core Functionality
- **AI-Powered Code Generation**: Generate React components, pages, and full applications using natural language
- **Visual Editor**: Drag-and-drop interface for building UIs
- **Real-time Preview**: Instant preview of changes
- **Code Editor**: Full-featured code editor with syntax highlighting
- **Project Management**: Create, save, and manage multiple projects
- **Template Library**: Pre-built templates and components
- **Deployment**: One-click deployment to various platforms

### Technologies Used
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **AI Integration**: OpenAI API for code generation
- **Database**: MongoDB for project persistence
- **Real-time**: WebSockets for collaboration
- **Deployment**: Docker, Vercel, Netlify integration

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB (for data persistence)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
lovable-clone/
├── frontend/          # React frontend application
├── backend/           # Node.js backend API
├── shared/            # Shared types and utilities
├── templates/         # Project templates
├── components/        # Reusable UI components
└── docs/             # Documentation
```

## API Documentation

### Projects API
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### AI Generation API
- `POST /api/generate/component` - Generate React component
- `POST /api/generate/page` - Generate full page
- `POST /api/generate/app` - Generate complete application

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.