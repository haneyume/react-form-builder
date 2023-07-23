import { useContext } from 'react';

import {
  Stack,
  ScrollArea,
  Select,
  TextInput,
  Accordion,
  Checkbox,
} from '@mantine/core';

import { AppContext } from '../contexts';

export const EditorPropertyEditor = () => {
  const defaultValue = [
    'FormfieldGeneral',
    'LayoutGeneral',
    'Select',
    'Textarea',
    'Button',
  ];

  return (
    <ScrollArea className="h-full">
      <Stack>
        <Accordion defaultValue={defaultValue} chevronPosition="left" multiple>
          <FormFieldGeneralPanel />
          <LayoutGeneralPanel />
          <SelectPanel />
          <TextareaPanel />
          <ButtonPanel />
        </Accordion>
      </Stack>
    </ScrollArea>
  );
};

const FormFieldGeneralPanel = () => {
  const projectCtx = useContext(AppContext);

  const types = [
    'TextInput',
    'NumberInput',
    'PasswordInput',
    'Checkbox',
    'Select',
    'Textarea',
    'Button',
  ];

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  } else if (!types.includes(current.data?.type || '')) {
    return null;
  }

  return (
    <Accordion.Item value="FormfieldGeneral">
      <Accordion.Control className="bg-neutral-800">General</Accordion.Control>
      <Accordion.Panel>
        <Stack>
          <TextInput label="Name" value={current.data?.name} disabled />

          <Select
            label="Type"
            data={types}
            value={current.data?.type}
            onChange={(value) =>
              projectCtx.setSingleItem(current.id, { type: value! })
            }
          />

          <Checkbox
            label="Required"
            checked={current.data?.required}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, {
                required: e.target.checked,
              })
            }
          />

          <TextInput
            label="Label"
            value={current.data?.label}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, { label: e.target.value })
            }
          />

          <TextInput
            label="Placeholder"
            value={current.data?.placeholder}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, {
                placeholder: e.target.value,
              })
            }
          />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

const LayoutGeneralPanel = () => {
  const projectCtx = useContext(AppContext);

  const types = ['Group', 'Stack', 'Grid', 'Card'];

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  } else if (!types.includes(current.data?.type || '')) {
    return null;
  }

  return (
    <Accordion.Item value="LayoutGeneral">
      <Accordion.Control className="bg-neutral-800">General</Accordion.Control>
      <Accordion.Panel>
        <Stack>
          <Select
            label="Type"
            data={types}
            value={current.data?.type}
            onChange={(value) =>
              projectCtx.setSingleItem(current.id, { type: value! })
            }
          />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

const SelectPanel = () => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  } else if (current.data?.type !== 'Select') {
    return null;
  }

  return (
    <Accordion.Item value="Select">
      <Accordion.Control className="bg-neutral-800">Select</Accordion.Control>
      <Accordion.Panel>
        <Stack>
          <TextInput label="name" />

          <Checkbox label="required" />

          <TextInput label="label" />

          <TextInput label="placeholder" />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

const TextareaPanel = () => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  } else if (current.data?.type !== 'Textarea') {
    return null;
  }

  return (
    <Accordion.Item value="Textarea">
      <Accordion.Control className="bg-neutral-800">Textarea</Accordion.Control>
      <Accordion.Panel>
        <Stack>
          <TextInput label="name" />

          <Checkbox label="required" />

          <TextInput label="label" />

          <TextInput label="placeholder" />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

const ButtonPanel = () => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  } else if (current.data?.type !== 'Button') {
    return null;
  }

  return (
    <Accordion.Item value="Button">
      <Accordion.Control className="bg-neutral-800">Button</Accordion.Control>
      <Accordion.Panel>
        <Stack>
          <TextInput label="name" />

          <Checkbox label="required" />

          <TextInput label="label" />

          <TextInput label="placeholder" />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};
