import { useContext } from 'react';

import { Stack, Radio } from '@mantine/core';

import { AppContext } from '../contexts';

export const CodeSidebar = () => {
  const projectCtx = useContext(AppContext);

  return (
    <Stack>
      <Radio.Group
        label="Code Type"
        value={projectCtx.codeType}
        onChange={(value) => projectCtx.setCodeType(value)}
      >
        <Stack mt="md">
          <Radio value="form" label="Form" />
          <Radio value="modal" label="Modal" />
        </Stack>
      </Radio.Group>
    </Stack>
  );
};
