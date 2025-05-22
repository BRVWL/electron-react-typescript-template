#!/usr/bin/env node

import { execSync } from 'child_process';
import os from 'os';

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

console.log(`${colors.cyan}Electron React TypeScript App - Setup Helper${colors.reset}`);
console.log(`${colors.cyan}===========================================${colors.reset}\n`);

const platform = os.platform();
console.log(`${colors.yellow}Detected platform:${colors.reset} ${platform}\n`);

// Check Node.js version
const nodeVersion = process.version;
console.log(`${colors.yellow}Node.js version:${colors.reset} ${nodeVersion}`);

const requiredNodeVersion = 'v16.4.0';
if (compareVersions(nodeVersion, requiredNodeVersion) < 0) {
  console.log(`${colors.red}Warning: Node.js version ${requiredNodeVersion} or higher is required.${colors.reset}`);
} else {
  console.log(`${colors.green}Node.js version check passed.${colors.reset}`);
}

// Install dependencies
console.log(`\n${colors.yellow}Installing dependencies...${colors.reset}`);
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log(`${colors.green}Dependencies installed successfully.${colors.reset}`);
} catch (error) {
  console.error(`${colors.red}Failed to install dependencies.${colors.reset}`);
  process.exit(1);
}

// Platform-specific checks and tips
console.log(`\n${colors.yellow}Platform-specific information:${colors.reset}`);

if (platform === 'darwin') {
  console.log(`${colors.cyan}macOS detected:${colors.reset}`);
  console.log('- You can build for macOS, Windows, and Linux');
  console.log('- Code signing requires Apple Developer credentials');
  console.log(`- Run ${colors.green}npm run make${colors.reset} to build for macOS`);
} else if (platform === 'win32') {
  console.log(`${colors.cyan}Windows detected:${colors.reset}`);
  console.log('- You can build for Windows and Linux');
  console.log('- You cannot build for macOS on Windows');
  console.log('- Windows builds require Visual Studio Build Tools');
  console.log(`- Run ${colors.green}npm run make:win${colors.reset} to build for Windows`);
} else if (platform === 'linux') {
  console.log(`${colors.cyan}Linux detected:${colors.reset}`);
  console.log('- You can build for Linux and Windows (with Wine and Mono)');
  console.log('- You cannot build for macOS on Linux');
  console.log('- For Windows builds, install Wine and Mono:');
  
  if (isDebianBased()) {
    console.log('  sudo apt-get install wine64 mono-complete');
  } else if (isRHELBased()) {
    console.log('  sudo dnf install wine mono-complete');
  }
  
  console.log(`- Run ${colors.green}npm run make:linux${colors.reset} to build for Linux`);
}

console.log(`\n${colors.green}Setup completed!${colors.reset}`);
console.log(`${colors.cyan}Run ${colors.green}npm start${colors.reset}${colors.cyan} to start the development server.${colors.reset}`);
console.log(`${colors.cyan}Check README.md for more details on building and development.${colors.reset}`);

// Helper functions
function compareVersions(a: string, b: string): number {
  const partsA = a.replace('v', '').split('.');
  const partsB = b.replace('v', '').split('.');
  
  for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
    const numA = parseInt(partsA[i] || '0');
    const numB = parseInt(partsB[i] || '0');
    
    if (numA > numB) return 1;
    if (numA < numB) return -1;
  }
  
  return 0;
}

function isDebianBased(): boolean {
  try {
    execSync('command -v apt-get');
    return true;
  } catch (error) {
    return false;
  }
}

function isRHELBased(): boolean {
  try {
    execSync('command -v dnf || command -v yum');
    return true;
  } catch (error) {
    return false;
  }
} 