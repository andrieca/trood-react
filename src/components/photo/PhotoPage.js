
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { capturePhoto } from '../stor/actions/photoAction';
import HeaderBack from '../header/HeaderBack';

const PhotoPage = () => {
  const dispatch = useDispatch();
  const photoUrl = useSelector(state => state.photo.photoUrl);

  const handleCapturePhoto = () => {
    dispatch(capturePhoto());
  };

  return (
    <div className='login'>
      <HeaderBack/>
      <button onClick={handleCapturePhoto}>Take Photo</button>
      {photoUrl && <img  style={{width:'100%'}} src={photoUrl} alt="Captured Photo" />}
    </div>
  );
};

export default PhotoPage;