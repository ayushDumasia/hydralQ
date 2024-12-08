import React from 'react';
import CustomLink from './common/CustomLink';

const Navbar: React.FC = () => {
  return (
    <nav className='flex items-center justify-between p-4 bg-transparent shadow-md'>
      <div className='flex items-center space-x-4'>
        <CustomLink to='/'>Home</CustomLink>
        <CustomLink to='/chat'>ChatBot</CustomLink>
        <CustomLink to='/about'>About Us</CustomLink>
      </div>

      <div className='flex items-center space-x-2'>
        <CustomLink to='/sign-in' className='p-2 rounded-md'>
          Sign In
        </CustomLink>
        <CustomLink
          to='/sign-up'
          className='p-2 rounded-md bg-extend-secondaryAzure hover:text-extend-backgroundWhite text-extend-backgroundLight'
        >
          Sign Up
        </CustomLink>
      </div>
    </nav>
  );
};

export default Navbar;
