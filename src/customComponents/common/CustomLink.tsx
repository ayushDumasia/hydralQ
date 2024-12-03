import React from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

interface LinkProps extends RouterLinkProps {
  className?: string;
}

const CustomLink: React.FC<LinkProps> = ({
  to,
  className,
  children,
  ...props
}) => {
  return (
    <RouterLink
      to={to}
      className={`text-gray-800 hover:text-gray-600 ${className || ''}`}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

export default CustomLink;
