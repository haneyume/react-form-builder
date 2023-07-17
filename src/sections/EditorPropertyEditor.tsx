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
  return (
    <ScrollArea className="h-full">
      <Stack>
        <Accordion
          defaultValue={['general', 'select', 'textarea']}
          chevronPosition="left"
          multiple
        >
          <GeneralPanel />
          <SelectPanel />
          <TextareaPanel />
        </Accordion>
      </Stack>
    </ScrollArea>
  );
};

const GeneralPanel = () => {
  const projectCtx = useContext(AppContext);

  const onChange = (
    id: string,
    data: {
      name?: string;
      type?: string;
      required?: boolean;
      label?: string;
      placeholder?: string;
    },
  ) => {
    projectCtx.setFormFieldItems((prev) => {
      const index = prev.findIndex((item) => item.id === id);
      if (index === -1) {
        return prev;
      }

      const updated = [...prev];
      updated[index].data = {
        ...updated[index].data,
        ...data,
      } as any;

      return updated;
    });
  };

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  }

  return (
    <Accordion.Item value="general">
      <Accordion.Control className="bg-neutral-800">General</Accordion.Control>
      <Accordion.Panel>
        <Stack>
          <TextInput label="Name" value={current.data?.name} disabled />

          <Select
            label="Type"
            data={[
              'text',
              'number',
              'password',
              'checkbox',
              'radio',
              'date',
              'time',
              'file',
              'range',
              'color',
              'select',
              'textarea',
            ]}
            value={current.data?.type}
            onChange={(value) => onChange(current.id, { type: value! })}
          />

          <Checkbox
            label="Required"
            checked={current.data?.required}
            onChange={(e) =>
              onChange(current.id, { required: e.target.checked })
            }
          />

          <TextInput
            label="Label"
            value={current.data?.label}
            onChange={(e) => onChange(current.id, { label: e.target.value })}
          />

          <TextInput
            label="Placeholder"
            value={current.data?.placeholder}
            onChange={(e) =>
              onChange(current.id, { placeholder: e.target.value })
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
  if (!current || current.data?.type !== 'select') {
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
  if (!current || current.data?.type !== 'textarea') {
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
