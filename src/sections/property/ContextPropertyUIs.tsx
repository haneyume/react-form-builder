import { useContext } from 'react';

import { TextInput } from '@mantine/core';

import { AppContext } from '../../contexts';
import type { GlobalState } from '../../types';

export const PropertyFieldString = ({
  field,
}: {
  field: keyof GlobalState;
}) => {
  const projectCtx = useContext(AppContext);

  return (
    <TextInput
      label={field}
      value={projectCtx.globalState[field] as string}
      onChange={(e) =>
        projectCtx.setGlobalState({
          [field]: e.currentTarget.value,
        })
      }
    />
  );
};
