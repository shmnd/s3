import React, { useState } from 'react';
import api from './api';

const ImageUpload = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);

        try {
            await api.post('images/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setFile(null);
            setTitle('');
            onUploadSuccess();
        } catch (err) {
            console.error('Upload failed:', err);
            setError('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload Image</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title (Optional)</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter image title"
                    />
                </div>
                <div className="form-group">
                    <label>Select Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
        </div>
    );
};

export default ImageUpload;
