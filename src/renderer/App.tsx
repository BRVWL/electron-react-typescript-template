import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [appVersion, setAppVersion] = useState<string>('Loading...');
  const [nodeVersion, setNodeVersion] = useState<string>('Loading...');
  const [chromeVersion, setChromeVersion] = useState<string>('Loading...');
  const [electronVersion, setElectronVersion] = useState<string>('Loading...');

  useEffect(() => {
    // Use the Electron API to get the app version
    if (window.electronAPI) {
      window.electronAPI.getAppVersion()
        .then(version => setAppVersion(version))
        .catch(err => {
          console.error('Failed to get app version:', err);
          setAppVersion('Error loading version');
        });
      window.electronAPI.getNodeVersion()
        .then(version => setNodeVersion(version))
        .catch(err => {
          console.error('Failed to get node version:', err);
          setNodeVersion('Error loading node version');
        });
      window.electronAPI.getChromeVersion()
        .then(version => setChromeVersion(version))
        .catch(err => {
          console.error('Failed to get chrome version:', err);
          setChromeVersion('Error loading chrome version');
        });
      window.electronAPI.getElectronVersion()
        .then(version => setElectronVersion(version))
        .catch(err => {
          console.error('Failed to get electron version:', err);
          setElectronVersion('Error loading electron version');
        });
    }
  }, []);

  return (
    <div className="container">
      <h1>💖 Hello from React with Electron!</h1>
      <button onClick={() => {
        console.log('Button clicked');
      }}>Click me</button>
      <p>Welcome to your Electron application built with React, TypeScript, and Vite.</p>
      <div className="version-info">
        <p>App Version: {appVersion}</p>
        <p>Node Version: {nodeVersion}</p>
        <p>Chrome Version: {chromeVersion}</p>
        <p>Electron Version: {electronVersion}</p>
      </div>
    </div>
  );
}

export default App; 