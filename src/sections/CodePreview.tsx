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
    let _code = projectCtx.formFieldItems
      .filter((item) => item.parent === 'root')
      .map((item) => {
        return genFieldCode(item, projectCtx.formFieldItems);
      })
      .join('\n');

    _code = genComponentCode(projectCtx.formFieldItems, _code);

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
      // defaultValue="// some comment"
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
} from '@mantine/core';
import { useForm, isNotEmpty, isEmail, isInRange } from '@mantine/form';

export const Form = () => {
  const form = useForm({
    initialValues: {
      ${initialValues}
    },
    validate: {
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
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

  switch (item.data?.type) {
    case 'TextInput':
      return `
        <TextInput
          label="${item.data.label}"
          placeholder="${item.data.placeholder}"
          withAsterisk={${item.data.withAsterisk}}
          {...form.getInputProps('${item.data.name}')}
        />
      `;
    case 'NumberInput':
      return `
        <NumberInput
          label="${item.data.label}"
          placeholder="${item.data.placeholder}"
          withAsterisk={${item.data.withAsterisk}}
          {...form.getInputProps('${item.data.name}')}
        />
      `;
    case 'PasswordInput':
      return `
        <PasswordInput
          label="${item.data.label}"
          placeholder="${item.data.placeholder}"
          withAsterisk={${item.data.withAsterisk}}
          {...form.getInputProps('${item.data.name}')}
        />
      `;
    case 'Checkbox':
      return `
        <Checkbox
          label="${item.data.label}"
          placeholder="${item.data.placeholder}"
          {...form.getInputProps('${item.data.name}', { type: 'checkbox' })}
        />
      `;
    case 'Select':
      return `
        <Select
          label="${item.data.label}"
          placeholder="${item.data.placeholder}"
          withAsterisk={${item.data.withAsterisk}}
          data={[]}
          {...form.getInputProps('${item.data.name}')}
        />
      `;
    case 'Textarea':
      return `
        <Textarea
          label="${item.data.label}"
          placeholder="${item.data.placeholder}"
          withAsterisk={${item.data.withAsterisk}}
          {...form.getInputProps('${item.data.name}')}
        />
      `;
    case 'Slider':
      return `
          <Slider
            label="${item.data.label}"
            {...form.getInputProps('${item.data.name}')}
          />
        `;
    case 'Button':
      return `
        <Button>${item.data.label}</Button>
      `;
    case 'Flex':
      return `
        <Flex>
          ${children.map((child) => genFieldCode(child, allItems)).join('\n')}
        </Flex>
      `;
    case 'Group':
      return `
        <Group>
          ${children.map((child) => genFieldCode(child, allItems)).join('\n')}
        </Group>
      `;
    case 'Stack':
      return `
        <Stack>
          ${children.map((child) => genFieldCode(child, allItems)).join('\n')}
        </Stack>
      `;
    case 'SimpleGrid':
      return `
        <SimpleGrid>
          ${children.map((child) => genFieldCode(child, allItems)).join('\n')}
        </SimpleGrid>
      `;
    case 'Card':
      return `
        <Card>
          ${children.map((child) => genFieldCode(child, allItems)).join('\n')}
        </Card>
      `;
    default:
      return '';
  }
};
