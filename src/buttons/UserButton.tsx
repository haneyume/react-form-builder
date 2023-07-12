import { UnstyledButton, Group, Avatar, Text } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

export const UserButton = ({
  name,
  email,
  icon,
  onClick,
}: {
  name: string;
  email: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <UnstyledButton onClick={onClick}>
      <Group>
        <Avatar color="yellow" radius="xl">
          {name.charAt(0)}
        </Avatar>

        <div className="flex-1">
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <IconChevronRight size={14} stroke={1.5} />}
      </Group>
    </UnstyledButton>
  );
};
