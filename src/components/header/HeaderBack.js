import React from 'react';
import back from '../../assets/back_icon.svg'
import { NavLink} from 'react-router-dom';

function HeaderBack(props) {


    return (
        <div>
            <NavLink className='link' to="#" onClick={() => window.history.back()}>
                <img style={{width: '25px', paddingLeft:'7px'}} src={back} alt='ph' />
                <span style={{
                    fontSize: '12px',
                    fontWeight: '400',
                    lineHeight: '14.52px'
                }}>back</span>
            </NavLink>

        </div>
    );
}

export default HeaderBack;