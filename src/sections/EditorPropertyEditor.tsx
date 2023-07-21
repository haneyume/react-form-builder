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
    'formfield_general',
    'layout_general',
    'select',
    'textarea',
    'button',
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

  // const types_ = [
  //   'text',
  //   'number',
  //   'password',
  //   'checkbox',
  //   'radio',
  //   'date',
  //   'time',
  //   'file',
  //   'range',
  //   'color',
  //   'select',
  //   'textarea',
  // ];

  const types = [
    'text',
    'password',
    'checkbox',
    'select',
    'textarea',
    'button',
  ];

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  } else if (!types.includes(current.data?.type || '')) {
    return null;
  }

  return (
    <Accordion.Item value="formfield_general">
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

  const types = ['row', 'column'];

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  } else if (!types.includes(current.data?.type || '')) {
    return null;
  }

  return (
    <Accordion.Item value="layout_general">
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
  } else if (current.data?.type !== 'select') {
    return null;
  }

  return (
    <Accordion.Item value="select">
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
  } else if (current.data?.type !== 'textarea') {
    return null;
  }

  return (
    <Accordion.Item value="textarea">
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
  } else if (current.data?.type !== 'button') {
    return null;
  }

  return (
    <Accordion.Item value="button">
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
