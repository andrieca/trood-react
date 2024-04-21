import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs, query, doc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { updateProfile } from '../stor/actions/profileAction';
import { useForm } from 'react-hook-form';
import { Context } from '../..';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getPhotos } from '../stor/actions/photosAction';
import '../profile/profileModal.scss';
import Footer from '../footer/Footer';
import HeaderBack from '../header/HeaderBack';

const ProfileModal = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  const profileData = useSelector(state => state.profile.myData);
  const profilePhoto = useSelector(state => state.photos.photos);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  console.log("user.uid", user.uid);

  useEffect(() => {
    const getProfilePhoto = async () => {
      try {
        const q = query(collection(db, 'photo'));
        const photosQuery = await getDocs(q);
        const photosData = photosQuery.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        dispatch(getPhotos(photosData));
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };
    getProfilePhoto();
  }, [dispatch]);

  console.log("photos", profilePhoto);

  const updateUserProfile = async (updatedData) => {
    console.log("updatedData", updatedData);
    try {
      const userQuery = query(collection(db, 'user'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(userQuery);

      querySnapshot.forEach(async (docs) => {
        const userData = docs.data();
        const userDocRef = doc(db, 'user', docs.id);
        const updatedUserData = {
          fullName: updatedData.fullName || userData.fullName,
          age: updatedData.age || userData.age,
          bio: updatedData.bio || userData.bio,
          interests: updatedData.interests || userData.interests,
          goal: updatedData.goal || userData.goal,
          professional: updatedData.professional || userData.professional,
          avatar: updatedData.avatar || userData.avatar
        };

        await updateDoc(userDocRef, updatedUserData);
        dispatch(updateProfile(updatedUserData));
        console.log("ProfileDataMod", profileData);
      });
    } catch (error) {
      console.log("Error updating document: ", error);
    }
  };

  return (
    <div>
      <HeaderBack />
      <div className="login-box">
        <h4>My photo</h4>
        <div className='row p-0 login-box'>
          <div className='col-6 '><img className='photo-avatar' src={profileData.avatar} alt='ggg' /></div>
          <div className='col div-photos'>
            <div className='row g-2 div-photos'>
              {profilePhoto.map(item => (
                <div className='col-6 photo-div' key={item.id}>
                  <img className='photo-img' src={item.photoUrl} alt='fff' onClick={() => updateUserProfile({ avatar: item.photoUrl })} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(updateUserProfile)}>

          <div className="user-box">
            <input
              type="text"
              name="fullName"
              placeholder='Name'
              {...register('fullName')}
            />
          </div>
          <div className="user-box">
            <input
              type="text"
              name="age"
              placeholder='age'
              {...register('age')}
            />

          </div>
          <div className='div-radio'>
            <input type="radio" className="btn-check" name="options-outlined" id="success-outlined" autocomplete="off" checked />
            <label class="btn " for="success-outlined">F</label>

            <input type="radio" className="btn-check" name="options-outlined" id="danger-outlined" autocomplete="off" checked />
            <label class="btn" for="danger-outlined">M</label>

            <input type="radio" className="btn-check" name="options-outlined" id="danger-outlined" autocomplete="off" checked />
            <label class="btn " for="danger-outlined">Both</label>
          </div>

          <div class="form-check">
            <label class="form-check-label" for="flexCheckIndeterminate">
              Location
            </label>
            <input class="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" />
          </div>

          <div className="user-box">
            <input
              type="text"
              name="bio"
              placeholder='bio'
              {...register('bio')}
            />
          </div>
          <div className="user-box">
            <input
              type="text"
              name="interests"
              placeholder='interests'
              {...register('interests')}
            />
          </div>
          <div className="user-box">
            <input
              type="text"
              name="goal"
              placeholder='goal'
              {...register('goal')}
            />
          </div>
          <div className="user-box">
            <input
              type="text"
              name="professional"
              placeholder='professional'
              {...register('professional')}
            />
          </div>
          <div className="user-box">
            <input
              type="text"
              name="status"
              placeholder='status'
              {...register('status')}
            />
          </div>
          <div className="user-box">
            <input
              type="text"
              name="avatar"
              value={selectedPhoto || ''}
              onChange={(e) => setSelectedPhoto(e.target.value)}
              placeholder='avatar'
              {...register('avatar')}
            />

          </div>
          <button className='btn-change' type="submit">save changes & UPD my characteristics</button>
        </form>
        {/* <Link to='/profileMy'>
            Back to Profile
          </Link> */}
      </div>
      <footer><Footer /></footer>
    </div>
  );
};

export default ProfileModal;



