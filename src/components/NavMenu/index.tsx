import { Box, styled } from '@mui/material';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const colors = {
  active: '#01659D',
  inactive: '#6E767A',
};

export default function NavMenu() {
  const location = useLocation();

  const menuItems = [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'Dashboard Analytics',
      path: '/dashboard-analytics',
    },
    // {
    //   label: 'Reporting',
    //   path: '/reporting',
    // },
    {
      label: 'Components Development',
      path: '/components-development',
    },
    {
      label: 'Drag and Drop Test',
      path: '/dnd',
    },
    {
      label: 'Analytics',
      path: '/analytics',
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <StyledMenuWrapper>
      {menuItems.map((item) => (
        <StyledMenuLink
          isActive={isActive(item.path)}
          key={item.path}
          to={item.path}
          style={{ margin: '10px' }}
        >
          {item.label}
        </StyledMenuLink>
      ))}
    </StyledMenuWrapper>
  );
}

const StyledMenuWrapper = styled(Box)({
  display: 'flex',
  gap: 2,
  padding: 10,
});

const StyledMenuLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>(({ isActive }) => ({
  textDecoration: 'none',
  color: isActive ? colors.active : colors.inactive,
  borderBottom: isActive ? `2px solid ${colors.active}` : 'none',
  flexGrow: 0,
  flexBasis: 'auto',
  minHeight: 0,
}));
