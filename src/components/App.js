import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./login/Login";
import Home from "./home/Home";
import Profile from "./profile/Profile";
import ProfileModal from "./profile/ProfileModal";
import PhotoPage from "./photo/PhotoPage";
import '../components/app.scss'

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profileMy' element={<Profile/>} />
        <Route path="/modal-profile" element={<ProfileModal/>}/>
        <Route path="/loader" element={<PhotoPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
