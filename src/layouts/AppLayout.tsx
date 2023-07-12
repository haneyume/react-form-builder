import { ReactNode } from 'react';

import { AppShell } from '@mantine/core';

import { AppHeader } from './AppHeader';
import { AppNavbar } from './AppNavbar';
import { AppFooter } from './AppFooter';

export const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AppShell
      header={<AppHeader />}
      navbar={<AppNavbar />}
      footer={<AppFooter />}
      // padding={0}
    >
      {children}
    </AppShell>
  );
};
