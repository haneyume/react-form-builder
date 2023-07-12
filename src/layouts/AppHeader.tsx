// import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header, Title, UnstyledButton } from '@mantine/core';
import { IconBrandReact } from '@tabler/icons-react';

// import { AppContext } from '../contexts';
import { ThemeButton, UserButton } from '../buttons';

export const AppHeader = () => {
  // const appCtx = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <Header height={{ base: 70 }}>
      <div className="px-5 h-full flex items-center space-x-5">
        <UnstyledButton onClick={() => navigate('/')}>
          <IconBrandReact />
        </UnstyledButton>

        <UnstyledButton onClick={() => navigate('/')}>
          <Title order={3}>react-form-builder</Title>
        </UnstyledButton>

        <div className="flex-1" />

        <ThemeButton />

        <UserButton
          name={'User'}
          email={'user@test.com'}
          onClick={() => navigate('/profile')}
        />
      </div>
    </Header>
  );
};
