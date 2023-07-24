import { useContext } from 'react';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconAbc } from '@tabler/icons-react';

import { v4 as uuidv4 } from 'uuid';

import { AppContext } from '../contexts';

export const NewTextButton = () => {
  const projectCtx = useContext(AppContext);

  return (
    <Tooltip label="Add a text">
      <ActionIcon
        onClick={() => {
          projectCtx.setFormFieldItems([
            ...projectCtx.formFieldItems,
            {
              id: uuidv4(),
              parent: 'root',
              text: 'Text',
              droppable: false,
              data: {
                type: 'Text',
                text: 'Text',
              },
            },
          ]);
        }}
      >
        <IconAbc size={18} />
      </ActionIcon>
    </Tooltip>
  );
};
