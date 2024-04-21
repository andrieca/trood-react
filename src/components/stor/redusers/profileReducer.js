import { UPDATE_PROFILE } from '../actions/profileAction';

const initialState = {
    myData : {
        userId: '',
        fullName: '',
        age: '',
        bio: '',
        interests: '',
        goal: '',
        professional: '',
        avatar: ''
    }
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        myData: action.payload
      };
    default:
      return state;
  }
};

export default profileReducer;