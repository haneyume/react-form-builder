import { useTranslation } from 'react-i18next';

import { Stack, Title } from '@mantine/core';

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <Stack>
      <Title>{t('Welcome')}</Title>
    </Stack>
  );
};
