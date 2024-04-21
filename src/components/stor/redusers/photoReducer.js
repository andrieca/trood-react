
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase';
import { CAPTURE_PHOTO } from '../actions/photoAction';

const initialState = {
  photoUrl: null,
};

const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case CAPTURE_PHOTO:
      
      const photoUrl = action.payload;

      const savePhotoToFirestore = async () => {
        try {
          const docRef = await addDoc(collection(db, 'photo'), { photoUrl });
          console.log("Document written with ID: ", docRef.id);
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      };

      savePhotoToFirestore();

      return {
        ...state,
        photoUrl,
      };
    default:
      return state;
  }
};

export default photoReducer;