import { useContext } from 'react';

import {
  Stack,
  ScrollArea,
  Select,
  TextInput,
  NumberInput,
  Accordion,
  Checkbox,
  Slider,
  Text,
} from '@mantine/core';

import { AppContext } from '../contexts';

import {
  PropertySection,
  PropertyFieldString,
  PropertyFieldBoolean,
  PropertyFieldEnum,
  PropertyFieldNumber,
} from './property/PropertyUIs';

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
const textTypes = ['Text', 'Title'];

const FlexDirection = ['row', 'column', 'row-reverse', 'column-reverse'];
const FlexWrap = ['nowrap', 'wrap', 'wrap-reverse'];
const AlignItems = ['stretch', 'center', 'flex-start', 'flex-end'];
const JustifyContent = [
  'center',
  'flex-start',
  'flex-end',
  'space-between',
  'space-around',
];

export const EditorPropertyEditor = () => {
  const defaultValue = [
    'FormFieldGeneral',
    'LayoutGeneral',
    'TextGeneral',
    ...formFieldTypes,
    ...layoutTypes,
    ...textTypes,
    'Validation',
  ];

  return (
    <ScrollArea className="h-full">
      <Stack>
        <Accordion defaultValue={defaultValue} chevronPosition="left" multiple>
          <FormFieldGeneralPanel />
          <LayoutGeneralPanel />
          <TextGeneralPanel />

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

          <TextPanel />
          <TitlePanel />

          <ValidationPanel />
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
    <Accordion.Item value="FormFieldGeneral">
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

const TextGeneralPanel = () => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  } else if (!textTypes.includes(current.data?.type || '')) {
    return null;
  }

  return (
    <Accordion.Item value="TextGeneral">
      <Accordion.Control className="bg-neutral-800">General</Accordion.Control>
      <Accordion.Panel>
        <Stack>
          <Select
            label="type"
            data={textTypes}
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
  return (
    <PropertySection label="TextInput">
      <PropertyFieldString field="label" />
      <PropertyFieldString field="placeholder" />
      <PropertyFieldBoolean field="withAsterisk" />
    </PropertySection>
  );
};

const NumberInputPanel = () => {
  return (
    <PropertySection label="NumberInput">
      <PropertyFieldString field="label" />
      <PropertyFieldString field="placeholder" />
      <PropertyFieldBoolean field="withAsterisk" />
    </PropertySection>
  );
};

const PasswordInputPanel = () => {
  return (
    <PropertySection label="PasswordInput">
      <PropertyFieldString field="label" />
      <PropertyFieldString field="placeholder" />
      <PropertyFieldBoolean field="withAsterisk" />
    </PropertySection>
  );
};

const CheckboxPanel = () => {
  return (
    <PropertySection label="Checkbox">
      <PropertyFieldString field="label" />
      <PropertyFieldString field="placeholder" />
    </PropertySection>
  );
};

const SelectPanel = () => {
  return (
    <PropertySection label="Select">
      <PropertyFieldString field="label" />
      <PropertyFieldString field="placeholder" />
      <PropertyFieldBoolean field="withAsterisk" />
    </PropertySection>
  );
};

const TextareaPanel = () => {
  return (
    <PropertySection label="Textarea">
      <PropertyFieldString field="label" />
      <PropertyFieldString field="placeholder" />
      <PropertyFieldBoolean field="withAsterisk" />
    </PropertySection>
  );
};

const ButtonPanel = () => {
  return (
    <PropertySection label="Button">
      <PropertyFieldString field="label" />
      <PropertyFieldEnum
        field="buttonVariant"
        data={[
          'default',
          'outline',
          'white',
          'light',
          'filled',
          'gradient',
          'subtle',
        ]}
      />
      <PropertyFieldEnum
        field="buttonType"
        data={['button', 'submit', 'reset']}
      />
    </PropertySection>
  );
};

const FlexPanel = () => {
  return (
    <PropertySection label="Flex">
      <PropertyFieldEnum field="direction" data={FlexDirection} />
      <PropertyFieldEnum field="wrap" data={FlexWrap} />
      <PropertyFieldEnum field="align" data={AlignItems} />
      <PropertyFieldEnum field="justify" data={JustifyContent} />
    </PropertySection>
  );
};

const GroupPanel = () => {
  return (
    <PropertySection label="Group">
      <PropertyFieldEnum
        field="position"
        data={['left', 'center', 'right', 'apart']}
      />
      <PropertyFieldBoolean field="grow" />
    </PropertySection>
  );
};

const StackPanel = () => {
  return (
    <PropertySection label="Stack">
      <PropertyFieldEnum field="align" data={AlignItems} />
      <PropertyFieldEnum field="justify" data={JustifyContent} />
    </PropertySection>
  );
};

const SimpleGridPanel = () => {
  return (
    <PropertySection label="SimpleGrid">
      <PropertyFieldNumber field="cols" />
    </PropertySection>
  );
};

const CardPanel = () => {
  return (
    <PropertySection label="Card">
      <PropertyFieldBoolean field="withBorder" />
    </PropertySection>
  );
};

const TextPanel = () => {
  return (
    <PropertySection label="Text">
      <PropertyFieldString field="text" />
    </PropertySection>
  );
};

const TitlePanel = () => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  } else if (current.data?.type !== 'Title') {
    return null;
  }

  return (
    <PropertySection label="Title">
      <PropertyFieldString field="text" />

      <Text size={'0.875rem'}>order</Text>
      <Slider
        label="order"
        min={1}
        max={6}
        step={1}
        value={current.data?.order}
        onChange={(value) =>
          projectCtx.setSingleItem(current.id, {
            order: Number(value),
          })
        }
      />
    </PropertySection>
  );
};

const ValidationPanel = () => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  } else if (current.data?.type === 'Button') {
    return null;
  } else if (!formFieldTypes.includes(current.data?.type || '')) {
    return null;
  }

  return (
    <Accordion.Item value="Validation">
      <Accordion.Control className="bg-neutral-800">
        Validation
      </Accordion.Control>
      <Accordion.Panel>
        <Stack>
          <Select
            label="Validate"
            data={[
              { label: 'none', value: 'none' },
              { label: 'isNotEmpty', value: 'isNotEmpty' },
              { label: 'isEmail', value: 'isEmail' },
              // { label: 'isInRange', value: 'isInRange' },
              // { label: 'hasLength', value: 'hasLength' },
              // { label: 'matches', value: 'matches' },
            ]}
            value={current.data?.validateType || 'none'}
            onChange={(value) =>
              projectCtx.setSingleItem(current.id, { validateType: value! })
            }
          />

          {(current.data?.validateType || 'none') !== 'none' && (
            <TextInput
              label="errorMessage"
              value={current.data?.errorMessage}
              onChange={(e) =>
                projectCtx.setSingleItem(current.id, {
                  errorMessage: e.target.value,
                })
              }
            />
          )}
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};
