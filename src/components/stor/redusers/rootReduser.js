import photoReducer from "./photoReducer";
import photosReducer from "./photosReducer";
import profileReducer from "./profileReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    profile: profileReducer,
    photo: photoReducer,
    photos: photosReducer
});

export default rootReducer;