import React, { useState, useEffect } from 'react';

function App() {
  const [appVersion, setAppVersion] = useState<string>('Loading...');
  const [nodeVersion, setNodeVersion] = useState<string>('Loading...');
  const [chromeVersion, setChromeVersion] = useState<string>('Loading...');
  const [electronVersion, setElectronVersion] = useState<string>('Loading...');

  useEffect(() => {
    // Use the Electron API to get the app version
    if (window.electronAPI) {
      window.electronAPI
        .getAppVersion()
        .then(version => setAppVersion(version))
        .catch(err => {
          console.error('Failed to get app version:', err);
          setAppVersion('Error loading version');
        });
      window.electronAPI
        .getNodeVersion()
        .then(version => setNodeVersion(version))
        .catch(err => {
          console.error('Failed to get node version:', err);
          setNodeVersion('Error loading node version');
        });
      window.electronAPI
        .getChromeVersion()
        .then(version => setChromeVersion(version))
        .catch(err => {
          console.error('Failed to get chrome version:', err);
          setChromeVersion('Error loading chrome version');
        });
      window.electronAPI
        .getElectronVersion()
        .then(version => setElectronVersion(version))
        .catch(err => {
          console.error('Failed to get electron version:', err);
          setElectronVersion('Error loading electron version');
        });
    }
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-8'>
      <div className='w-full max-w-lg'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg'>
            <span className='text-2xl'>⚡</span>
          </div>
          <h1 className='text-4xl font-light text-gray-900 mb-2 tracking-tight'>
            Electron
          </h1>
          <p className='text-lg text-gray-500 font-light'>
            React · TypeScript · Vite
          </p>
        </div>

        {/* Main Content Card */}
        <div className='bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-200/50 shadow-xl shadow-gray-900/5 p-8 mb-8'>
          <div className='text-center mb-8'>
            <h2 className='text-2xl font-medium text-gray-900 mb-2'>Welcome</h2>
            <p className='text-gray-600 leading-relaxed'>
              Your modern desktop application is ready to use
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={() => {
              console.log('Button clicked');
            }}
            className='w-full bg-black text-white font-medium py-4 px-6 rounded-2xl hover:bg-gray-800 transition-all duration-200 transform hover:scale-[0.98] active:scale-95 mb-8'
          >
            Get Started
          </button>

          {/* System Info Grid */}
          <div className='grid grid-cols-2 gap-4'>
            <div className='bg-gray-50/80 rounded-2xl p-4 text-center'>
              <div className='text-sm font-medium text-gray-900 mb-1'>App</div>
              <div className='text-xs text-gray-600 font-mono truncate'>
                {appVersion}
              </div>
            </div>
            <div className='bg-gray-50/80 rounded-2xl p-4 text-center'>
              <div className='text-sm font-medium text-gray-900 mb-1'>Node</div>
              <div className='text-xs text-gray-600 font-mono truncate'>
                {nodeVersion}
              </div>
            </div>
            <div className='bg-gray-50/80 rounded-2xl p-4 text-center'>
              <div className='text-sm font-medium text-gray-900 mb-1'>
                Chrome
              </div>
              <div className='text-xs text-gray-600 font-mono truncate'>
                {chromeVersion}
              </div>
            </div>
            <div className='bg-gray-50/80 rounded-2xl p-4 text-center'>
              <div className='text-sm font-medium text-gray-900 mb-1'>
                Electron
              </div>
              <div className='text-xs text-gray-600 font-mono truncate'>
                {electronVersion}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='text-center'>
          <p className='text-sm text-gray-400 font-light'>
            Built with modern web technologies
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
