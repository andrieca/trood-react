import home_icon from '../../assets/user_icon.svg';
import contacts_icon from '../../assets/contacts_icon (1).svg';
import person_plus from '../../assets/person_plus.svg';
import chat from '../../assets/chat.svg'
import React from 'react';
import './footer.scss';
import { NavLink } from 'react-router-dom';

function Footer(props) {
    return (

        <footer className="footer">

            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className='footer-main'>
                            <NavLink to="/home" className="footer-link" style={({ isActive }) => ({ opacity: isActive ? '1' : '0.5' })} ><img className="footer-link_img" src={home_icon} alt='pay' /><p>Home</p></NavLink>
                            <NavLink to="/transactions" className="footer-link" style={({ isActive }) => ({ opacity: isActive ? '1' : '0.5' })}><img className="footer-link_img" src={person_plus} alt='pay' /><p>Find match</p></NavLink>
                            <NavLink to="/contacts" className="footer-link" style={({ isActive }) => ({ opacity: isActive ? '1' : '0.5' })}><img className="footer-link_img" src={contacts_icon} alt='pay' /><p>My people</p></NavLink>
                            <NavLink to="/my_profile" className="footer-link" style={({ isActive }) => ({ opacity: isActive ? '1' : '0.5' })}><img className="footer-link_img" src={chat} alt='pay' /><p>Chat </p></NavLink>
                        </div>
                    </div>
                </div>

            </div>
        </footer>

    );
}

export default Footer;