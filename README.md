# Electron React TypeScript App

A desktop application built with Electron, React, TypeScript, and Vite.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16.4.0 or higher)
- npm (comes with Node.js)

## Getting Started

### Installation

Clone the repository and install dependencies:

```bash
# Clone this repository (if you haven't already)
git clone <repository-url>

# Navigate to the app directory
cd app

# Install dependencies
npm install
```

### Development

To start the application in development mode:

```bash
npm start
```

This will:
- Start the development server
- Open the application in a new window
- Enable hot-reloading for quick development

## Building for Production

### Building for Current Platform

To build the application for your current operating system:

```bash
npm run make
```

The packaged application will be available in the `out/make` directory.

### Building for Specific Platforms

This project includes scripts to build for specific platforms:

```bash
# Build for macOS
npm run make:mac

# Build for Windows
npm run make:win

# Build for Linux
npm run make:linux

# Build for all platforms (macOS, Windows, and Linux)
npm run make:all
```

### Cross-Platform Build Notes

- **Building macOS apps**: Can only be done on macOS due to code signing requirements
- **Building Windows apps on macOS/Linux**: Requires Wine and Mono for certain functionality
- **Building Linux apps on macOS/Windows**: Generally works without extra requirements
- **Native dependencies**: May require platform-specific compilation

For serious cross-platform builds, consider using CI/CD services like GitHub Actions or CircleCI with runners for each platform.

## Project Structure

This project follows a well-organized architecture that separates Electron's main process from the renderer process (UI):

```
├── src/
│   ├── index.ts              # Application entry point
│   ├── main/                 # Electron main process code
│   │   ├── main.ts           # Main process implementation
│   │   ├── preload.ts        # Preload script for secure IPC
│   │   └── ipc/              # IPC handlers module
│   │       ├── index.ts      # Exports from IPC module
│   │       └── handlers.ts   # All IPC message handlers
│   ├── renderer/             # React UI code
│   │   ├── App.tsx           # Main React component
│   │   ├── renderer.tsx      # React entry point
│   │   └── index.css         # Styling
│   └── shared/               # Shared code between processes
│       └── electron.d.ts     # TypeScript definitions
├── index.html                # HTML template
├── package.json              # Project dependencies and scripts
├── forge.config.ts           # Electron Forge configuration
├── vite.main.config.ts       # Vite config for main process
├── vite.preload.config.ts    # Vite config for preload script
└── vite.renderer.config.ts   # Vite config for renderer process
```

### Architecture

The application uses a secure architecture with clear separation between the main process and renderer process:

1. **Main Process (`src/main/`)**: 
   - Handles application lifecycle, windows, and OS integration
   - Contains all Node.js and Electron API access

2. **IPC Module (`src/main/ipc/`)**:
   - Centralizes all IPC (Inter-Process Communication) handlers
   - Organizes handlers by functionality for better code organization
   - Separates IPC concerns from the main process logic

3. **Preload Script (`src/main/preload.ts`)**:
   - Creates a secure bridge between main and renderer processes
   - Exposes a limited API through contextBridge
   - Prevents direct access to Node.js APIs from the renderer

4. **Renderer Process (`src/renderer/`)**:
   - Contains the React application that renders the UI
   - Communicates with the main process only through the exposed API
   - Built with modern React practices and TypeScript

5. **Shared Code (`src/shared/`)**:
   - Contains TypeScript types and interfaces shared between processes
   - Ensures type safety across the application

## Technologies

- [Electron](https://www.electronjs.org/) - Cross-platform desktop apps with JavaScript
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Vite](https://vitejs.dev/) - Fast build tool
- [Electron Forge](https://www.electronforge.io/) - Complete build toolchain for Electron apps

## Security Best Practices

This application follows Electron's security best practices:

1. **Content Security Policy (CSP)**:
   - Implemented via meta tag in index.html
   - Restricts script and style sources to prevent XSS attacks
   - Follows the principle of least privilege

2. **Context Isolation**:
   - Enabled in BrowserWindow configuration
   - Prevents malicious scripts from accessing Electron/Node.js APIs
   - Creates a separate JavaScript context for preload script

3. **Secure IPC Communication**:
   - Uses contextBridge to expose only specific APIs
   - Centralized IPC handlers in dedicated module
   - Restricts renderer's access to main process

4. **Web Security**:
   - Enabled by default in BrowserWindow configuration
   - Enforces same-origin policy
   - Prevents loading and execution of remote code

5. **Node Integration Disabled**:
   - Prevents direct access to Node.js APIs from renderer
   - Reduces potential attack surface

For more information on Electron security best practices, visit the [Electron Security documentation](https://www.electronjs.org/docs/latest/tutorial/security).
