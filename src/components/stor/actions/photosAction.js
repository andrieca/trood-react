import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

export const GET_PHOTOS = 'GET_PHOTOS';

export const getPhotos = () => {
  return async (dispatch) => {
    try {
      const photosData = [];
      const querySnapshot = await getDocs(collection(db, 'photo'));
      querySnapshot.forEach((doc) => {
        photosData.push({ id: doc.id, ...doc.data() });
      });
      dispatch({ type: GET_PHOTOS, payload: photosData });
    } catch (error) {
      console.error('Error getting photos:', error);
    }
  };
};