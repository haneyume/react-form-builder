import { useContext } from 'react';

import { Stack, Title, TextInput, Accordion, Checkbox } from '@mantine/core';

import { AppContext } from '../contexts';

export const EditorPropertyEditor = () => {
  return (
    <Stack>
      <Accordion defaultValue={['0', '1']} chevronPosition="left" multiple>
        <Accordion.Item value="0">
          <Accordion.Control className="bg-gray-800">Basic</Accordion.Control>
          <Accordion.Panel>
            <BasicPanel />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="1">
          <Accordion.Control className="bg-gray-800">
            Advanced
          </Accordion.Control>
          <Accordion.Panel>
            <AdvancedPanel />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
};

const BasicPanel = () => {
  const projectCtx = useContext(AppContext);

  return (
    <Stack>
      <TextInput label="name" />

      <Checkbox label="required" />

      <TextInput label="label" />

      <TextInput label="placeholder" />
    </Stack>
  );
};

const AdvancedPanel = () => {
  const projectCtx = useContext(AppContext);

  return (
    <Stack>
      <TextInput label="name" />

      <Checkbox label="required" />

      <TextInput label="label" />

      <TextInput label="placeholder" />
    </Stack>
  );
};
