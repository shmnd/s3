import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import ImageGallery from './ImageGallery';
import './App.css';

function App() {
  const [refreshGallery, setRefreshGallery] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshGallery((prev) => prev + 1);
  };

  return (
    <div className="app-container">
      <header>
        <h1>S3 Image Uploader</h1>
      </header>
      <main>
        <ImageUpload onUploadSuccess={handleUploadSuccess} />
        <ImageGallery refreshTrigger={refreshGallery} />
      </main>
    </div>
  );
}

export default App;
