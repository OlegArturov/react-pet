import React from 'react';
import { Link, createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import DashboardPage from 'drupal-dashboard';

const Navbar = () => {
  const menuItems = [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'Dashboard Analytics',
      path: '/dashboard-analytics',
    },
    {
      label: 'Reporting',
      path: '/reporting',
    },
  ];
  return (
    <div>
      <h1>React Drupal</h1>
      {menuItems.map((item) => (
        <Link key={item.path} to={item.path}>
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/*',
      element: (
        <>
          <Navbar />
          <Outlet />
        </>
      ),
      children: [
        {
          path: '',
          element: <div>Home</div>,
        },
        {
          path: 'dashboard-analytics',
          element: <DashboardPage />,
        },
        {
          path: 'reporting',
          element: <div>Reporting</div>,
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
