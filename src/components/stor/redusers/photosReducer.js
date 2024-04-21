import { GET_PHOTOS } from '../actions/photosAction';

const initialState = {
  photos: [],
};

const photosReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PHOTOS:
      return {
        ...state,
        photos: action.payload,
      };
    default:
      return state;
  }
};

export default photosReducer;

