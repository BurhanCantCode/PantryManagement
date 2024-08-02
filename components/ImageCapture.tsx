import React, { useState, useRef, useEffect } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { CameraAlt, FileUpload, Close } from '@mui/icons-material';
import Webcam from 'react-webcam';

interface ImageCaptureProps {
  onImageCapture: (imageData: string) => void;
}

const ImageCapture: React.FC<ImageCaptureProps> = ({ onImageCapture }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const handleImageCapture = (capturedImage: string) => {
    setImageSrc(capturedImage);
    onImageCapture(capturedImage);
    setIsWebcamOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleImageCapture(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const captureFromWebcam = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      handleImageCapture(imageSrc);
    }
  };

  const clearImage = () => {
    setImageSrc(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Box>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      {isMobile ? (
        <Button
          variant="contained"
          startIcon={<CameraAlt />}
          onClick={() => fileInputRef.current?.click()}
          sx={{ mr: 2 }}
        >
          Take Photo
        </Button>
      ) : (
        <Button
          variant="contained"
          startIcon={<CameraAlt />}
          onClick={() => setIsWebcamOpen(true)}
          sx={{ mr: 2 }}
        >
          Use Webcam
        </Button>
      )}
      <Button
        variant="outlined"
        startIcon={<FileUpload />}
        onClick={() => fileInputRef.current?.click()}
      >
        Upload Image
      </Button>

      {isWebcamOpen && !isMobile && (
        <Box mt={2}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: 'environment' }}
          />
          <Button onClick={captureFromWebcam} variant="contained" sx={{ mt: 1 }}>
            Capture
          </Button>
        </Box>
      )}

      {imageSrc && (
        <Box mt={2} position="relative">
          <Typography variant="subtitle1">Captured Image:</Typography>
          <img src={imageSrc} alt="Captured product" style={{ maxWidth: '100%', maxHeight: '200px' }} />
          <IconButton
            onClick={clearImage}
            sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'background.paper' }}
          >
            <Close />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

export default ImageCapture;