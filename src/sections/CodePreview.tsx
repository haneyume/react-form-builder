import { useContext, useEffect, useState } from 'react';

import Editor from '@monaco-editor/react';

import prettier from 'prettier/standalone';
import prettierPluginBabel from 'prettier/plugins/babel';

// @ts-ignore
import prettierPluginEstree from 'prettier/plugins/estree';

import { AppContext } from '../contexts';
import type { DNDTreeFormFieldItem } from '../types';

export const CodePreview = () => {
  const projectCtx = useContext(AppContext);

  const [code, setCode] = useState<string>('');

  useEffect(() => {
    let _code = genCode(projectCtx.formFieldItems);

    prettier
      .format(_code, {
        parser: 'babel',
        plugins: [prettierPluginBabel, prettierPluginEstree],
      })
      .then((formattedCode) => {
        setCode(formattedCode);
      });
  }, []);

  return (
    <Editor
      height="100%"
      theme="vs-dark"
      defaultLanguage="typescript"
      options={{}}
      value={code}
      beforeMount={(monaco) => {
        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: true,
          noSyntaxValidation: true,
        });
      }}
    />
  );
};

const genCode = (allItems: DNDTreeFormFieldItem[]) => {
  const importCode = genImportCode();

  const fieldCode = allItems
    .filter((item) => item.parent === 'root')
    .map((item) => {
      return genFieldCode(item, allItems);
    })
    .join('\n');

  const componentCode = genComponentCode(allItems, fieldCode);

  return importCode + componentCode;
};

const genImportCode = () => {
  return `import React from 'react';
  import {
    // Form fields
    TextInput,
    NumberInput,
    PasswordInput,
    Checkbox,
    Select,
    Textarea,
    Button,
  
    // Layouts
    Group,
    Stack,
    SimpleGrid,
    Card,
  
    // Typography
    Text,
    Title,
  } from '@mantine/core';
  import { useForm, isNotEmpty, isEmail, isInRange } from '@mantine/form';

`;
};

const genComponentCode = (
  allItems: DNDTreeFormFieldItem[],
  children: string,
): string => {
  const initialValues = allItems
    .filter((items) => {
      return items.data?.name && items.data?.type !== 'Button';
    })
    .map((item) => {
      return `${item.data?.name}: '${''}',`;
    })
    .join('\n');

  const validate = allItems
    .filter((items) => {
      return items.data?.name && items.data?.type !== 'Button';
    })
    .filter((item) => {
      return item.data?.validateType;
    })
    .map((item) => {
      const name = item.data?.name;
      const validateType = item.data?.validateType;
      const errorMessage = item.data?.errorMessage;

      switch (validateType) {
        case 'isNotEmpty':
          return `${name}: isNotEmpty('${errorMessage}'),`;
        case 'isEmail':
          return `${name}: isEmail('${errorMessage}'),`;
        default:
          return '';
      }
    })
    .join('\n');

  return `const Form = () => {
  const form = useForm({
    initialValues: {
      ${initialValues}
    },
    validate: {
      ${validate}
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        // TODO: Submit form
        console.log(values);
      })}
    >
      <Stack>
        ${children}
      </Stack>
    </form>
  );
};  
`;
};

const genFieldCode = (
  item: DNDTreeFormFieldItem,
  allItems: DNDTreeFormFieldItem[],
): string => {
  const uuid = item.id;
  const children = allItems.filter((child) => child.parent === uuid);

  const {
    // Form fields
    name,
    label,
    placeholder,
    withAsterisk,
    readonly,
    disabled,
    autosize,
    minRows,
    maxRows,
    data,
    buttonVariant,
    buttonType,

    // Layouts
    direction,
    wrap,
    align,
    justify,
    position,
    grow,
    cols,
    withBorder,

    // Text
    text,
    order,
  } = item.data!;

  switch (item.data?.type) {
    case 'TextInput':
      return `
        <TextInput
          ${label ? `label={'${label}'}` : ''}
          ${placeholder ? `placeholder={'${placeholder}'}` : ''}
          ${withAsterisk ? `withAsterisk` : ''}
          {...form.getInputProps('${name}')}
        />
      `;
    case 'NumberInput':
      return `
        <NumberInput
          ${label ? `label={'${label}'}` : ''}
          ${placeholder ? `placeholder={'${placeholder}'}` : ''}
          ${withAsterisk ? `withAsterisk` : ''}
          {...form.getInputProps('${name}')}
        />
      `;
    case 'PasswordInput':
      return `
        <PasswordInput
          ${label ? `label={'${label}'}` : ''}
          ${placeholder ? `placeholder={'${placeholder}'}` : ''}
          ${withAsterisk ? `withAsterisk` : ''}
          {...form.getInputProps('${name}')}
        />
      `;
    case 'Checkbox':
      return `
        <Checkbox
          ${label ? `label={'${label}'}` : ''}
          ${placeholder ? `placeholder={'${placeholder}'}` : ''}
          {...form.getInputProps('${name}', { type: 'checkbox' })}
        />
      `;
    case 'Select':
      return `
        <Select
          ${label ? `label={'${label}'}` : ''}
          ${placeholder ? `placeholder={'${placeholder}'}` : ''}
          ${withAsterisk ? `withAsterisk` : ''}
          ${data ? `data={${JSON.stringify(data)}}` : ''}
          {...form.getInputProps('${name}')}
        />
      `;
    case 'Textarea':
      return `
        <Textarea
          ${label ? `label={'${label}'}` : ''}
          ${placeholder ? `placeholder={'${placeholder}'}` : ''}
          ${withAsterisk ? `withAsterisk` : ''}
          ${autosize ? `autosize` : ''}
          ${minRows ? `minRows={${minRows}}` : ''}
          ${maxRows ? `maxRows={${maxRows}}` : ''}
          {...form.getInputProps('${name}')}
        />
      `;
    case 'Slider':
      return `
          <Slider
            ${label ? `label={'${label}'}` : ''}
            {...form.getInputProps('${name}')}
          />
        `;
    case 'Button':
      return `
        <Button
          ${buttonVariant ? `variant={'${buttonVariant}'}` : ''}
          ${buttonType ? `type={'${buttonType}'}` : ''}
        >
          ${label}
        </Button>
      `;
    case 'Flex':
      return `
        <Flex
          ${direction ? `direction={'${direction}'}` : ''}
          ${wrap ? `wrap={'${wrap}'}` : ''}
          ${align ? `align={'${align}'}` : ''}
          ${justify ? `justify={'${justify}'}` : ''}
        >
          ${children.map((child) => genFieldCode(child, allItems)).join('\n')}
        </Flex>
      `;
    case 'Group':
      return `
        <Group
          ${position ? `position={'${position}'}` : ''}
          ${grow ? `grow` : ''}
        >
          ${children.map((child) => genFieldCode(child, allItems)).join('\n')}
        </Group>
      `;
    case 'Stack':
      return `
        <Stack
          ${align ? `align={'${align}'}` : ''}
          ${justify ? `justify={'${justify}'}` : ''}
        >
          ${children.map((child) => genFieldCode(child, allItems)).join('\n')}
        </Stack>
      `;
    case 'SimpleGrid':
      return `
        <SimpleGrid
          ${cols ? `cols={${cols}}` : ''}
        >
          ${children.map((child) => genFieldCode(child, allItems)).join('\n')}
        </SimpleGrid>
      `;
    case 'Card':
      return `
        <Card
          ${withBorder ? `withBorder` : ''}
        >
          ${children.map((child) => genFieldCode(child, allItems)).join('\n')}
        </Card>
      `;
    case 'Text':
      return `
          <Text>
            ${text}
          </Text>
        `;
    case 'Title':
      return `
          <Title
            ${order ? `order={${order}}` : ''}
          >
            ${text}
          </Title>
        `;
    default:
      return '';
  }
};
