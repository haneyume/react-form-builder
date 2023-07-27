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
  PropertySectionWithLabelCheck,
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
    'Form Field',
    'Layout',
    'Typography',
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
    <PropertySection label="Form Field">
      <TextInput label="name" value={current.data?.name} disabled />

      <Select
        label="type"
        data={formFieldTypes}
        value={current.data?.type}
        onChange={(value) =>
          projectCtx.setSingleItem(current.id, { type: value! })
        }
      />
    </PropertySection>
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
    <PropertySection label="Layout">
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
    </PropertySection>
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
    <PropertySection label="Typography">
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
    </PropertySection>
  );
};

const TextInputPanel = () => {
  return (
    <PropertySectionWithLabelCheck label="TextInput">
      <PropertyFieldString field="label" />
      <PropertyFieldString field="placeholder" />
      <PropertyFieldBoolean field="withAsterisk" />
    </PropertySectionWithLabelCheck>
  );
};

const NumberInputPanel = () => {
  return (
    <PropertySectionWithLabelCheck label="NumberInput">
      <PropertyFieldString field="label" />
      <PropertyFieldString field="placeholder" />
      <PropertyFieldBoolean field="withAsterisk" />
    </PropertySectionWithLabelCheck>
  );
};

const PasswordInputPanel = () => {
  return (
    <PropertySectionWithLabelCheck label="PasswordInput">
      <PropertyFieldString field="label" />
      <PropertyFieldString field="placeholder" />
      <PropertyFieldBoolean field="withAsterisk" />
    </PropertySectionWithLabelCheck>
  );
};

const CheckboxPanel = () => {
  return (
    <PropertySectionWithLabelCheck label="Checkbox">
      <PropertyFieldString field="label" />
      <PropertyFieldString field="placeholder" />
    </PropertySectionWithLabelCheck>
  );
};

const SelectPanel = () => {
  return (
    <PropertySectionWithLabelCheck label="Select">
      <PropertyFieldString field="label" />
      <PropertyFieldString field="placeholder" />
      <PropertyFieldBoolean field="withAsterisk" />
    </PropertySectionWithLabelCheck>
  );
};

const TextareaPanel = () => {
  return (
    <PropertySectionWithLabelCheck label="Textarea">
      <PropertyFieldString field="label" />
      <PropertyFieldString field="placeholder" />
      <PropertyFieldBoolean field="withAsterisk" />
    </PropertySectionWithLabelCheck>
  );
};

const ButtonPanel = () => {
  return (
    <PropertySectionWithLabelCheck label="Button">
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
    </PropertySectionWithLabelCheck>
  );
};

const FlexPanel = () => {
  return (
    <PropertySectionWithLabelCheck label="Flex">
      <PropertyFieldEnum field="direction" data={FlexDirection} />
      <PropertyFieldEnum field="wrap" data={FlexWrap} />
      <PropertyFieldEnum field="align" data={AlignItems} />
      <PropertyFieldEnum field="justify" data={JustifyContent} />
    </PropertySectionWithLabelCheck>
  );
};

const GroupPanel = () => {
  return (
    <PropertySectionWithLabelCheck label="Group">
      <PropertyFieldEnum
        field="position"
        data={['left', 'center', 'right', 'apart']}
      />
      <PropertyFieldBoolean field="grow" />
    </PropertySectionWithLabelCheck>
  );
};

const StackPanel = () => {
  return (
    <PropertySectionWithLabelCheck label="Stack">
      <PropertyFieldEnum field="align" data={AlignItems} />
      <PropertyFieldEnum field="justify" data={JustifyContent} />
    </PropertySectionWithLabelCheck>
  );
};

const SimpleGridPanel = () => {
  return (
    <PropertySectionWithLabelCheck label="SimpleGrid">
      <PropertyFieldNumber field="cols" />
    </PropertySectionWithLabelCheck>
  );
};

const CardPanel = () => {
  return (
    <PropertySectionWithLabelCheck label="Card">
      <PropertyFieldBoolean field="withBorder" />
    </PropertySectionWithLabelCheck>
  );
};

const TextPanel = () => {
  return (
    <PropertySectionWithLabelCheck label="Text">
      <PropertyFieldString field="text" />
    </PropertySectionWithLabelCheck>
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
    <PropertySectionWithLabelCheck label="Title">
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
    </PropertySectionWithLabelCheck>
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
    <PropertySection label="Validation">
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
    </PropertySection>
  );
};
