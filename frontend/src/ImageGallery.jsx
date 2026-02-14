import React, { useEffect, useState } from 'react';
import api from './api';

const ImageGallery = ({ refreshTrigger }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchImages();
    }, [refreshTrigger]);

    const fetchImages = async () => {
        try {
            const response = await api.get('images/');
            setImages(response.data);
        } catch (err) {
            console.error('Failed to fetch images:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading gallery...</p>;

    return (
        <div className="gallery-container">
            <h2>Image Gallery</h2>
            {images.length === 0 ? (
                <p>No images uploaded yet.</p>
            ) : (
                <div className="image-grid">
                    {images.map((img) => (
                        <div key={img.id} className="image-card">
                            <img src={img.image} alt={img.title} />
                            {img.title && <p>{img.title}</p>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageGallery;
