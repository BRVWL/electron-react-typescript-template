# Modern Electron Desktop App Template

A comprehensive, production-ready template for building modern desktop applications with Electron, React, TypeScript, and Vite. Features a complete development setup with UI components and includes a system monitoring example to demonstrate real-world usage.

## Template Features

- ⚡ **Modern Stack**: Electron + React + TypeScript + Vite for fast development
- 🎨 **UI**: Beautiful, professional interface with shadcn/ui components
- 🌗 **Dark/Light Mode**: Built-in theme switching with smooth transitions
- 🔒 **Security First**: Follows Electron security best practices out of the box
- 🎯 **Type Safety**: Full TypeScript coverage with proper IPC typing
- 🛠️ **Developer Experience**: Hot reload, error handling, and debugging tools
- 📦 **Build Ready**: Configured for cross-platform builds with Electron Forge
- 🎭 **Component Library**: Complete shadcn/ui integration with 15+ components
- 🔌 **IPC Architecture**: Clean, organized Inter-Process Communication setup
- 📱 **Responsive Design**: Mobile-first approach with Tailwind CSS

## Example Implementation

The template includes a **System Monitoring Dashboard** as a practical example:

- 🖥️ Real-time CPU and memory usage tracking
- 📊 Platform-specific system statistics (optimized for macOS)
- 🌐 Network status and process information
- ⚡ Live updates every 2 seconds

## Prerequisites

- [Node.js](https://nodejs.org/) (v16.4.0 or higher)
- npm (comes with Node.js)

## Getting Started

### Installation

Clone the repository and install dependencies:

````bash
# Clone this template repository
git clone <repository-url>

```bash
# Navigate to the project directory
cd electron-react-typescript-template

# Install dependencies
npm install
````

### Development

To start the application in development mode:

```bash
npm start
```

This will:

- Start the development server
- Open your Electron app in a new window
- Enable hot-reloading for quick development
- Display the example system monitoring dashboard

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

## Template Structure

This template provides a well-organized architecture that separates Electron's main process from the renderer process (UI), making it easy to extend for any desktop application:

```
├── src/
│   ├── index.ts              # Application entry point
│   ├── main/                 # Electron main process code
│   │   ├── main.ts           # Main process implementation
│   │   ├── preload.ts        # Preload script for secure IPC
│   │   └── ipc/              # IPC handlers module
│   │       ├── index.ts      # Exports from IPC module
│   │       └── handlers.ts   # System monitoring IPC handlers
│   ├── renderer/             # React UI code
│   │   ├── App.tsx           # Main React component with system dashboard
│   │   ├── renderer.tsx      # React entry point
│   │   ├── index.css         # shadcn/ui styling with CSS variables
│   │   ├── components/       # shadcn/ui component library
│   │   │   └── ui/           # Reusable UI components
│   │   │       ├── button.tsx    # Button component
│   │   │       ├── card.tsx      # Card component
│   │   │       ├── badge.tsx     # Badge component
│   │   │       ├── progress.tsx  # Progress bar component
│   │   │       ├── switch.tsx    # Toggle switch component
│   │   │       ├── tooltip.tsx   # Tooltip component
│   │   │       └── ...           # Additional UI components
│   │   └── lib/
│   │       └── utils.ts      # Utility functions (cn, etc.)
│   └── shared/               # Shared code between processes
│       └── electron.d.ts     # TypeScript definitions for IPC APIs
├── components.json           # shadcn/ui configuration
├── index.html                # HTML template
├── package.json              # Project dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── tsconfig.json             # TypeScript configuration with path mapping
├── forge.config.ts           # Electron Forge configuration
├── vite.main.config.ts       # Vite config for main process
├── vite.preload.config.ts    # Vite config for preload script
└── vite.renderer.config.ts   # Vite config for renderer process
```

### Template Architecture

The template uses a secure, scalable architecture with clear separation between processes:

1. **Main Process (`src/main/`)**:

   - Handles application lifecycle, windows, and OS integration
   - Contains all Node.js and Electron API access

2. **IPC Module (`src/main/ipc/`)**:

   - Centralized Inter-Process Communication handlers
   - Organized, modular approach for different feature sets
   - Example: System monitoring APIs with platform-specific optimizations
   - Easy to extend with new functionality

3. **Preload Script (`src/main/preload.ts`)**:

   - Creates a secure bridge between main and renderer processes
   - Exposes a limited API through contextBridge
   - Prevents direct access to Node.js APIs from the renderer

4. **Renderer Process (`src/renderer/`)**:

   - Modern React application
   - Complete shadcn/ui component integration
   - Dark/light mode with smooth transitions
   - Example: Real-time dashboard implementation
   - Easy to replace with your own UI components

5. **UI Components (`src/components/ui/`)**:

   - Complete shadcn/ui component library integration
   - Reusable, accessible, and styled components
   - Consistent design system with CSS variables
   - Tailwind CSS for utility-first styling

6. **Shared Code (`src/shared/`)**:
   - TypeScript interfaces and type definitions
   - Shared utilities and constants
   - Ensures type safety across all processes
   - Example: System monitoring data interfaces

## Building Your Own App

### 1. Replace the Example Content

The template includes a system monitoring example in:

- `src/main/ipc/handlers.ts` - Replace with your own IPC handlers
- `src/renderer/App.tsx` - Replace with your main UI component
- `src/shared/electron.d.ts` - Update with your own type definitions

### 2. Add Your Features

The template follows a simple 4-step pattern for adding any feature:

#### **Step 1: Define Your Data Types**

```typescript
// src/shared/electron.d.ts
export interface YourDataType {
  id: string;
  name: string;
  // ... your fields
}

// Extend the API interface
declare global {
  interface Window {
    electronAPI: {
      // ... existing methods
      yourNewFeature: (data: YourDataType) => Promise<YourDataType>;
    };
  }
}
```

#### **Step 2: Create Backend Handler**

```typescript
// src/main/ipc/handlers.ts
export function registerIpcHandlers(): void {
  // ... existing handlers

  ipcMain.handle('your-new-feature', async (_, data: YourDataType) => {
    // Your backend logic here:
    // - File operations
    // - Database queries
    // - API calls
    // - System integration

    return processedData;
  });
}
```

#### **Step 3: Expose to Frontend**

```typescript
// src/main/preload.ts
contextBridge.exposeInMainWorld('electronAPI', {
  // ... existing methods
  yourNewFeature: data => ipcRenderer.invoke('your-new-feature', data),
});
```

#### **Step 4: Use in React Components**

```tsx
// src/renderer/App.tsx
function YourComponent() {
  const [data, setData] = useState(null);

  const handleAction = async () => {
    try {
      const result = await window.electronAPI.yourNewFeature(inputData);
      setData(result);
    } catch (error) {
      console.error('Feature failed:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Feature</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleAction}>Execute Feature</Button>
        {data && <div>Result: {JSON.stringify(data)}</div>}
      </CardContent>
    </Card>
  );
}
```

#### **Common Feature Patterns**

**File Operations:**

- Backend: Use Node.js `fs` module, `dialog` for file selection
- Frontend: File upload/download UI with progress indicators

**Settings Management:**

- Backend: JSON file storage in `app.getPath('userData')`
- Frontend: Settings panels with form controls

**Database Integration:**

- Backend: SQLite, PostgreSQL, or any database driver
- Frontend: CRUD operations with loading states

**External APIs:**

- Backend: `fetch()` or `axios` for HTTP requests
- Frontend: Data fetching hooks with error handling

**System Integration:**

- Backend: OS notifications, shell commands, file system watching
- Frontend: Status indicators and system information displays

**Real-time Updates:**

- Backend: Event emitters to send updates to frontend
- Frontend: Event listeners for live data updates

#### **Development Workflow**

1. **Start with types** - Define your data structure first
2. **Build backend logic** - Implement the core functionality
3. **Expose safely** - Only expose what the frontend needs
4. **Create UI components** - Build user interface with error handling
5. **Test thoroughly** - Use developer tools and console for debugging

This pattern scales from simple features (showing a notification) to complex ones (real-time file synchronization) while maintaining security and type safety.

### 3. Customize the UI

The template includes a complete component library:

- Replace the header with your own branding
- Modify the color scheme in `tailwind.config.js`
- Add new shadcn/ui components as needed
- Customize the dark/light mode implementation

### 4. Example Use Cases

This template is perfect for building:

- **System utilities** (monitoring, file management, backup tools)
- **Development tools** (IDEs, database clients, API testing)
- **Productivity apps** (note-taking, task management, time tracking)
- **Creative tools** (image editors, music players, video tools)
- **Business applications** (CRM, inventory, analytics dashboards)

## Technologies & Stack

- [Electron](https://www.electronjs.org/) - Cross-platform desktop app framework
- [React](https://reactjs.org/) - Modern UI library with hooks and components
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript for better DX
- [Vite](https://vitejs.dev/) - Lightning-fast build tool and dev server
- [Electron Forge](https://www.electronforge.io/) - Complete toolchain for packaging
- [shadcn/ui](https://ui.shadcn.com/) - High-quality, accessible component library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible UI primitives

## Troubleshooting

**Common Development Issues**:

**Template Setup Issues**:

**App Won't Start**:

- Ensure Node.js v16.4.0 or higher is installed
- Run `npm install` to install all dependencies
- Check for port conflicts if running in development mode

**Components Not Styling Correctly**:

- Ensure Tailwind CSS is properly configured
- Check that `postcss.config.js` is present
- Verify `src/renderer/index.css` contains shadcn/ui variables

### Template Development Issues

**TypeScript Errors**:

- Run `npm run type-check` to verify types
- Ensure all dependencies are up to date
- Check `tsconfig.json` path mappings are correct

**Build Failures**:

- Clear `node_modules` and run `npm install`
- Check Electron Forge configuration in `forge.config.ts`
- Verify all Vite configurations are properly set up

**Adding New Components**:

- Use `npx shadcn-ui@latest add <component>` to add new UI components
- Import components using the `@/` alias configured in `tsconfig.json`
- Follow the existing patterns in `src/renderer/App.tsx`

## Template Security

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

## Customization Guide

### Changing the App Name and Branding

1. **Update package.json**:

   ```json
   {
     "name": "your-app-name",
     "productName": "Your App Name",
     "description": "Your app description"
   }
   ```

2. **Update the window title** in `src/renderer/App.tsx`:

   ```tsx
   <h1 className='ml-4 text-sm font-medium'>Your App Name</h1>
   ```

3. **Update the app icon** (add your icon files to the project and update `forge.config.ts`)

### Adding New Features

1. **Backend Logic**: Add new IPC handlers in `src/main/ipc/handlers.ts`
2. **API Exposure**: Update the preload script in `src/main/preload.ts`
3. **Type Safety**: Add interfaces in `src/shared/electron.d.ts`
4. **UI Components**: Build your interface in `src/renderer/App.tsx`

### Styling Customization

The template uses a carefully crafted design system:

- **Colors**: Modify `tailwind.config.js` and `src/renderer/index.css`
- **Components**: All shadcn/ui components can be customized
- **Themes**: Dark/light mode variables are in CSS custom properties
- **Layout**: Spacing and typography are easily adjustable

## Contributing

This template is designed to be a solid foundation for any Electron desktop application. Contributions are welcome!

### Areas for Improvement

- Additional example implementations (file manager, text editor, etc.)
- More UI component examples and patterns
- Enhanced build and deployment configurations
- Additional platform-specific optimizations
- Performance monitoring and debugging tools

---

**Start building your desktop application today!** This template provides everything you need to create professional, secure, and performant Electron apps with modern web technologies.
