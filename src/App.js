import React from 'react';
import ChatComponent from './components/ChatComponent';
import { Typography } from '@mui/material';

function App() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5', height: '100vh' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Chat Application
      </Typography>
      <ChatComponent />
      <footer style={{ marginTop: '20px', textAlign: 'center', color: 'gray' }}>
        <Typography variant="caption">Developed by Adarsh Sharma</Typography>
      </footer>

    </div>
  );
}

export default App;
