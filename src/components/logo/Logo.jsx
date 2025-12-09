import React from 'react';
import logo from '../../../public/scholarstrem-logo.png'

const Logo = () => {
    return (
        <div className='flex items-center'>
            <img className='w-15 h-15' src={logo} alt="" />
            <h3 className='-ml-2 text-white'><span className='font-bold text-secondary'>Scholar</span>Stream</h3>
        </div>
    );
};

export default Logo;