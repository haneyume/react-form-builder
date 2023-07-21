import { useRoutes } from 'react-router-dom';

import { AppProvider } from './contexts';
import { AppLayout } from './layouts';
import {
  HomePage,
  CodePage,
  SettingsPage,
  NotFoundPage,
  TestPage,
} from './pages';

export const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/code',
      element: <CodePage />,
    },
    {
      path: '/settings',
      element: <SettingsPage />,
    },
    {
      path: '/test',
      element: <TestPage />,
    },
    {
      path: '/*',
      element: <NotFoundPage />,
    },
  ]);

  return (
    <AppProvider>
      <AppLayout>{routes}</AppLayout>
    </AppProvider>
  );
};
