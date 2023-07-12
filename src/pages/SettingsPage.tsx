import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Stack,
  Card,
  Title,
  Select,
  useMantineColorScheme,
} from '@mantine/core';

import { AppContext } from '../contexts';

export const SettingsPage = () => {
  const appCtx = useContext(AppContext);
  const { t, i18n } = useTranslation();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Stack>
      <Card className="overflow-visible" withBorder>
        <Stack>
          <Title order={3}>{t('Settings')}</Title>

          <Select
            label={t('Language')}
            data={appCtx.languages}
            value={i18n.language}
            onChange={(value) => i18n.changeLanguage(value!)}
          />

          <Select
            label={t('Color Scheme')}
            data={[
              { label: t('light'), value: 'light' },
              { label: t('dark'), value: 'dark' },
            ]}
            value={colorScheme}
            onChange={(value) => toggleColorScheme(value as 'light' | 'dark')}
          />
        </Stack>
      </Card>
    </Stack>
  );
};
