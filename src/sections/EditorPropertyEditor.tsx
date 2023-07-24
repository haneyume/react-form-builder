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

const formFieldTypes = [
  'TextInput',
  'NumberInput',
  'PasswordInput',
  'Checkbox',
  'Select',
  'Textarea',
  'Button',
];

const layoutTypes = ['Group', 'Stack', 'Grid', 'Card'];

export const EditorPropertyEditor = () => {
  const defaultValue = [
    'FormfieldGeneral',
    'LayoutGeneral',
    ...formFieldTypes,
    ...layoutTypes,
  ];

  return (
    <ScrollArea className="h-full">
      <Stack>
        <Accordion defaultValue={defaultValue} chevronPosition="left" multiple>
          <FormFieldGeneralPanel />
          <LayoutGeneralPanel />
          <TextInputPanel />
          <NumberInputPanel />
          <PasswordInputPanel />
          <CheckboxPanel />
          <SelectPanel />
          <TextareaPanel />
          <ButtonPanel />
          <GroupPanel />
          <StackPanel />
        </Accordion>
      </Stack>
    </ScrollArea>
  );
};

const FormFieldGeneralPanel = () => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  } else if (!formFieldTypes.includes(current.data?.type || '')) {
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
            data={formFieldTypes}
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

const LayoutGeneralPanel = () => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  } else if (!layoutTypes.includes(current.data?.type || '')) {
    return null;
  }

  return (
    <Accordion.Item value="LayoutGeneral">
      <Accordion.Control className="bg-neutral-800">General</Accordion.Control>
      <Accordion.Panel>
        <Stack>
          <Select
            label="Type"
            data={layoutTypes}
            value={current.data?.type}
            onChange={(value) =>
              projectCtx.setSingleItem(
                current.id,
                {
                  type: value!,
                  name: value!,
                },
                value!,
              )
            }
          />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

const TextInputPanel = () => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  } else if (current.data?.type !== 'TextInput') {
    return null;
  }

  return (
    <Accordion.Item value="Select">
      <Accordion.Control className="bg-neutral-800">
        TextInput
      </Accordion.Control>
      <Accordion.Panel>
        <Stack>
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

          <Checkbox
            label="Required"
            checked={current.data?.required}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, {
                required: e.target.checked,
              })
            }
          />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

const NumberInputPanel = () => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  } else if (current.data?.type !== 'NumberInput') {
    return null;
  }

  return (
    <Accordion.Item value="Select">
      <Accordion.Control className="bg-neutral-800">
        NumberInput
      </Accordion.Control>
      <Accordion.Panel>
        <Stack>
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

          <Checkbox
            label="Required"
            checked={current.data?.required}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, {
                required: e.target.checked,
              })
            }
          />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

const PasswordInputPanel = () => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  } else if (current.data?.type !== 'PasswordInput') {
    return null;
  }

  return (
    <Accordion.Item value="Select">
      <Accordion.Control className="bg-neutral-800">
        PasswordInput
      </Accordion.Control>
      <Accordion.Panel>
        <Stack>
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

          <Checkbox
            label="Required"
            checked={current.data?.required}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, {
                required: e.target.checked,
              })
            }
          />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

const CheckboxPanel = () => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  } else if (current.data?.type !== 'Checkbox') {
    return null;
  }

  return (
    <Accordion.Item value="Select">
      <Accordion.Control className="bg-neutral-800">Checkbox</Accordion.Control>
      <Accordion.Panel>
        <Stack>
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

          <Checkbox
            label="Required"
            checked={current.data?.required}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, {
                required: e.target.checked,
              })
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

          <Checkbox
            label="Required"
            checked={current.data?.required}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, {
                required: e.target.checked,
              })
            }
          />
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

          <Checkbox
            label="Required"
            checked={current.data?.required}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, {
                required: e.target.checked,
              })
            }
          />
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
          <TextInput
            label="Label"
            value={current.data?.label}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, { label: e.target.value })
            }
          />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

const GroupPanel = () => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  } else if (current.data?.type !== 'Group') {
    return null;
  }

  return (
    <Accordion.Item value="Button">
      <Accordion.Control className="bg-neutral-800">Group</Accordion.Control>
      <Accordion.Panel>
        <Stack>
          <Select
            label="Position"
            data={['left', 'center', 'right', 'apart']}
            value={current.data?.type}
            onChange={(value) =>
              projectCtx.setSingleItem(
                current.id,
                {
                  type: value!,
                  name: value!,
                },
                value!,
              )
            }
          />

          <Checkbox
            label="Grow"
            checked={current.data?.required}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, {
                required: e.target.checked,
              })
            }
          />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

const StackPanel = () => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  } else if (current.data?.type !== 'Stack') {
    return null;
  }

  return (
    <Accordion.Item value="Button">
      <Accordion.Control className="bg-neutral-800">Stack</Accordion.Control>
      <Accordion.Panel>
        <Stack>
          <Select
            label="Align"
            data={['stretch', 'center', 'flex-start', 'flex-end']}
            value={current.data?.type}
            onChange={(value) =>
              projectCtx.setSingleItem(
                current.id,
                {
                  type: value!,
                  name: value!,
                },
                value!,
              )
            }
          />

          <Select
            label="Justify"
            data={[
              'center',
              'flex-start',
              'flex-end',
              'space-between',
              'space-around',
            ]}
            value={current.data?.type}
            onChange={(value) =>
              projectCtx.setSingleItem(
                current.id,
                {
                  type: value!,
                  name: value!,
                },
                value!,
              )
            }
          />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};
