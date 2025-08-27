import React from 'react';
import DashboardPage from 'drupal-dashboard';
import { Link, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Box, Typography, styled } from '@mui/material';
import DragAndDropTest from './pages/DnD/drag-and-drop-test';
import ComponentsDevelopmentPage from './pages/components-development/components-development';
import NavMenu from './components/NavMenu';
import Grid from '@mui/material/Grid';
import Analytics from './pages/Analytics';
// import Analytics from '@apiboost/analytics';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/*',
      element: (
        <StyledAppWrapper>
          <NavMenu />
          <StyledAppContentWrapper>
            <Outlet />
          </StyledAppContentWrapper>
        </StyledAppWrapper>
      ),
      children: [
        {
          path: '',
          element: <div>Home</div>,
        },
        {
          path: 'dashboard-analytics',
          element: (
            <>
              <Typography>Dashboard from package</Typography>
              <DashboardPage />
            </>
          ),
        },
        {
          path: 'reporting',
          element: <div>Reporting</div>,
        },
        {
          path: 'components-development',
          element: <ComponentsDevelopmentPage />,
        },
        {
          path: 'dnd',
          element: <DragAndDropTest />,
        },
        {
          path: 'analytics',
          // element: <Analytics />,
          // element: <></>,
          element: <Analytics />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

const StyledAppWrapper = styled(Grid)({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
});

const StyledAppContentWrapper = styled(Box)({
  flex: '1 1 0%',
  minHeight: 0,
});
