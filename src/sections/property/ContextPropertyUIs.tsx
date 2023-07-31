import { useContext } from 'react';

import { TextInput, Select } from '@mantine/core';

import { AppContext } from '../../contexts';
import type { GlobalState } from '../../types';

export const ContextPropertyFieldString = ({
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
          ...projectCtx.globalState,
          [field]: e.currentTarget.value,
        })
      }
    />
  );
};

export const ContextPropertyFieldEnum = ({
  field,
  data,
}: {
  field: keyof GlobalState;
  data: string[];
}) => {
  const projectCtx = useContext(AppContext);

  return (
    <Select
      label={field}
      data={data}
      value={projectCtx.globalState[field] as string}
      onChange={(value) =>
        projectCtx.setGlobalState({
          ...projectCtx.globalState,
          [field]: value!,
        })
      }
    />
  );
};
