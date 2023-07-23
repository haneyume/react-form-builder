import { useContext } from 'react';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconLayoutBoard } from '@tabler/icons-react';

import { v4 as uuidv4 } from 'uuid';

import { AppContext } from '../contexts';

export const NewLayoutButton = () => {
  const projectCtx = useContext(AppContext);

  return (
    <Tooltip label="Add a row / column">
      <ActionIcon
        onClick={() => {
          projectCtx.setFormFieldItems([
            ...projectCtx.formFieldItems,
            {
              id: uuidv4(),
              parent: 'root',
              text: 'Group',
              droppable: true,
              data: {
                name: 'Group',
                type: 'Group',
              },
            },
          ]);
        }}
      >
        <IconLayoutBoard size={18} />
      </ActionIcon>
    </Tooltip>
  );
};
