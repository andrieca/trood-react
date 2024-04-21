
export const capturePhotoURL = async () => {
    try {
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      const videoElement = document.createElement('video');
      
      videoElement.srcObject = mediaStream;
      
      await videoElement.play();
      
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      
      const context = canvas.getContext('2d');
      
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      
      const photoUrl = canvas.toDataURL('image/png');
     
      mediaStream.getTracks().forEach(track => track.stop());
      return photoUrl;
    } catch (error) {
      console.error('Error capturing photo URL:', error);
      throw error;
    }
  };