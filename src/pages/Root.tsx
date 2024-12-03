import Navbar from '@/customComponents/Navbar';
import { Outlet, useLocation } from 'react-router-dom';

export default function Root() {
  const location = useLocation();

  const shouldRenderNavbar = !['/sign-in', '/sign-up', '/chat'].includes(
    location.pathname,
  );

  return (
    <div>
      {shouldRenderNavbar && <Navbar />}
      <Outlet />
    </div>
  );
}
