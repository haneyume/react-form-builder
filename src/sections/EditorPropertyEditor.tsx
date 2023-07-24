import { useContext } from 'react';

import {
  Stack,
  ScrollArea,
  Select,
  TextInput,
  NumberInput,
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

const layoutTypes = ['Flex', 'Group', 'Stack', 'SimpleGrid', 'Card'];

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

          <FlexPanel />
          <GroupPanel />
          <StackPanel />
          <SimpleGridPanel />
          <CardPanel />
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
          <TextInput label="name" value={current.data?.name} disabled />

          <Select
            label="type"
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
            label="type"
            data={layoutTypes}
            value={current.data?.type}
            onChange={(value) =>
              projectCtx.setSingleItem(
                current.id,
                {
                  type: value!,
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
            label="label"
            value={current.data?.label}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, { label: e.target.value })
            }
          />

          <TextInput
            label="placeholder"
            value={current.data?.placeholder}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, {
                placeholder: e.target.value,
              })
            }
          />

          <Checkbox
            label="withAsterisk"
            checked={current.data?.withAsterisk}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, {
                withAsterisk: e.target.checked,
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
            label="label"
            value={current.data?.label}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, { label: e.target.value })
            }
          />

          <TextInput
            label="placeholder"
            value={current.data?.placeholder}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, {
                placeholder: e.target.value,
              })
            }
          />

          <Checkbox
            label="withAsterisk"
            checked={current.data?.withAsterisk}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, {
                withAsterisk: e.target.checked,
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
            label="label"
            value={current.data?.label}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, { label: e.target.value })
            }
          />

          <TextInput
            label="placeholder"
            value={current.data?.placeholder}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, {
                placeholder: e.target.value,
              })
            }
          />

          <Checkbox
            label="withAsterisk"
            checked={current.data?.withAsterisk}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, {
                withAsterisk: e.target.checked,
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
            label="label"
            value={current.data?.label}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, { label: e.target.value })
            }
          />

          <TextInput
            label="placeholder"
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
            label="label"
            value={current.data?.label}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, { label: e.target.value })
            }
          />

          <TextInput
            label="placeholder"
            value={current.data?.placeholder}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, {
                placeholder: e.target.value,
              })
            }
          />

          <Checkbox
            label="withAsterisk"
            checked={current.data?.withAsterisk}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, {
                withAsterisk: e.target.checked,
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
            label="label"
            value={current.data?.label}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, { label: e.target.value })
            }
          />

          <TextInput
            label="placeholder"
            value={current.data?.placeholder}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, {
                placeholder: e.target.value,
              })
            }
          />

          <Checkbox
            label="withAsterisk"
            checked={current.data?.withAsterisk}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, {
                withAsterisk: e.target.checked,
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
            label="label"
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

const FlexPanel = () => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  } else if (current.data?.type !== 'Flex') {
    return null;
  }

  return (
    <Accordion.Item value="Button">
      <Accordion.Control className="bg-neutral-800">Flex</Accordion.Control>
      <Accordion.Panel>
        <Stack>
          <Select
            label="align"
            data={['stretch', 'center', 'flex-start', 'flex-end']}
            value={current.data?.align}
            onChange={(value) =>
              projectCtx.setSingleItem(current.id, {
                align: value!,
              })
            }
          />

          <Select
            label="justify"
            data={[
              'center',
              'flex-start',
              'flex-end',
              'space-between',
              'space-around',
            ]}
            value={current.data?.justify}
            onChange={(value) =>
              projectCtx.setSingleItem(current.id, {
                justify: value!,
              })
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
            label="position"
            data={['left', 'center', 'right', 'apart']}
            value={current.data?.position}
            onChange={(value) =>
              projectCtx.setSingleItem(current.id, {
                position: value!,
              })
            }
          />

          <Checkbox
            label="grow"
            checked={current.data?.grow}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, {
                grow: e.target.checked,
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
            label="align"
            data={['stretch', 'center', 'flex-start', 'flex-end']}
            value={current.data?.align}
            onChange={(value) =>
              projectCtx.setSingleItem(current.id, {
                align: value!,
              })
            }
          />

          <Select
            label="justify"
            data={[
              'center',
              'flex-start',
              'flex-end',
              'space-between',
              'space-around',
            ]}
            value={current.data?.justify}
            onChange={(value) =>
              projectCtx.setSingleItem(current.id, {
                justify: value!,
              })
            }
          />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

const SimpleGridPanel = () => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  } else if (current.data?.type !== 'SimpleGrid') {
    return null;
  }

  return (
    <Accordion.Item value="Button">
      <Accordion.Control className="bg-neutral-800">
        SimpleGrid
      </Accordion.Control>
      <Accordion.Panel>
        <Stack>
          <NumberInput
            label="cols"
            value={current.data?.cols}
            onChange={(value) =>
              projectCtx.setSingleItem(current.id, {
                cols: Number(value),
              })
            }
          />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

const CardPanel = () => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  } else if (current.data?.type !== 'Card') {
    return null;
  }

  return (
    <Accordion.Item value="Button">
      <Accordion.Control className="bg-neutral-800">Card</Accordion.Control>
      <Accordion.Panel>
        <Stack>
          <Checkbox
            label="withBorder"
            checked={current.data?.withBorder}
            onChange={(e) =>
              projectCtx.setSingleItem(current.id, {
                withBorder: e.target.checked,
              })
            }
          />
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};
