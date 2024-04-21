export const UPDATE_PROFILE = 'UPDATE_PROFILE';

export const updateProfile = (updatedData) => {
  return {
    type: UPDATE_PROFILE,
    payload: updatedData
  };
};