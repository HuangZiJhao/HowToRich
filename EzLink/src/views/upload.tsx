// src/ImageUpload.js
import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import http from '../utils/http';

const ImageUpload = () => {
    const [file, setFile] = useState(null);
    const [shortUrl, setShortUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleFileChange = (event: any) => {
        debugger;
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event: any) => {
        debugger;
        event.preventDefault();

        if (!file) {
            alert('請選取一個文件');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await http().post('/upload', formData);
            const data = response.data;
            setShortUrl(data.shortUrl);
            setImageUrl(data.shortUrl);
        } catch (error) {
            console.error('上傳過程中出錯', error);
            alert('圖片上傳失敗');
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                圖片上傳並生成短網址
            </Typography>
            <form onSubmit={handleSubmit}>
                <input
                    accept="*"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="file-input"
                />
                <label htmlFor="file-input">
                    <Button variant="contained" color="primary" component="span" startIcon={<PhotoCamera />}>
                        選擇圖片
                    </Button>
                </label>
                <Button variant="contained" color="secondary" type="submit" style={{ marginTop: '20px' }}>
                    上傳圖片
                </Button>
            </form>
            {shortUrl && (
                <div style={{ marginTop: '20px' }}>
                    <Typography variant="body1">
                        短網址: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
                    </Typography>
                    <img src={imageUrl} alt="Uploaded" style={{ display: 'block', marginTop: '20px' }} />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
