import { capturePhotoURL } from '../../photo/pfotoServes';

export const CAPTURE_PHOTO = 'CAPTURE_PHOTO';


export const capturePhoto = () => {
  return async (dispatch) => {
    try {
      const photoUrl = await capturePhotoURL();
      if (!photoUrl) {
        throw new Error('Empty photo URL');
      }
      dispatch({ type: CAPTURE_PHOTO, payload: photoUrl });
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };
};