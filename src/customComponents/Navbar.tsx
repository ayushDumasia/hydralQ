import { Button } from '@/components/ui/button';
import React from 'react';
import CustomLink from './common/CustomLink';

const Navbar: React.FC = () => {
  return (
    <nav className='flex items-center justify-between p-4 bg-white shadow-md'>
      <div className='flex items-center space-x-4'>
        <CustomLink to='/'>Home</CustomLink>
        <CustomLink to='/chat'>ChatBot</CustomLink>
        <CustomLink to='/about'>About Us</CustomLink>
      </div>

      <div className='flex items-center space-x-2'>
        <Button variant='outline'>Sign In</Button>
        <Button className='bg-[#161D6F]'>Sign Up</Button>
      </div>
    </nav>
  );
};

export default Navbar;
