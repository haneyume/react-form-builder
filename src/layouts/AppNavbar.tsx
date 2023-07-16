import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Navbar, NavLink, Badge, Stack, Tooltip } from '@mantine/core';
import { IconHome, IconCode, IconSettings } from '@tabler/icons-react';

export const AppNavbar = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const links = [
    {
      icon: IconHome,
      label: 'Home',
      path: '/',
      notifications: 0,
    },
    {
      icon: IconCode,
      label: 'Code',
      path: '/code',
      notifications: 0,
    },
    {
      icon: IconSettings,
      label: 'Settings',
      path: '/settings',
      notifications: 0,
    },
  ];

  return (
    <Navbar width={{ base: 50 }}>
      <Navbar.Section>
        <Stack className="my-5" spacing={5}>
          {links.map((link, index) => {
            const Icon = link.icon;

            return (
              <Tooltip key={index} label={t(link.label)} position="bottom">
                <NavLink
                  icon={<Icon size={18} />}
                  label={t(link.label)}
                  onClick={() => navigate(link.path)}
                  active={link.path === window.location.pathname}
                  rightSection={
                    link.notifications > 0 && (
                      <Badge size="sm" variant="filled">
                        {link.notifications}
                      </Badge>
                    )
                  }
                />
              </Tooltip>
            );
          })}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};
