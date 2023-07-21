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

    _code = genComponentCode(_code);

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

const genComponentCode = (children: string): string => {
  return `import React from 'react';
import { Stack, Group, TextInput, PasswordInput, } from '@mantine/core';

export const Form = () => {
  return (
    <Stack>
      ${children}
    </Stack>
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
    case 'text':
      return `
        <TextInput
          label="${item.data.label}"
          placeholder="${item.data.placeholder}"
          withAsterisk={${item.data.required}}
        />
      `;
    case 'password':
      return `
        <PasswordInput
          label="${item.data.label}"
          placeholder="${item.data.placeholder}"
          withAsterisk={${item.data.required}}
        />
      `;
    case 'checkbox':
      return `
        <Checkbox label="${item.data.label}" placeholder="${item.data.placeholder}" />
      `;
    case 'range':
      return `
        <Slider label="${item.data.label}" />
      `;
    case 'select':
      return `
        <Select
          label="${item.data.label}"
          placeholder="${item.data.placeholder}"
          withAsterisk={${item.data.required}}
          data={[]}
        />
      `;
    case 'textarea':
      return `
        <Textarea
          label="${item.data.label}"
          placeholder="${item.data.placeholder}"
          withAsterisk={${item.data.required}}
        />
      `;
    case 'button':
      return `
        <Button>${item.data.label}</Button>
      `;
    case 'row':
      return `
        <Group>
          ${children.map((child) => genFieldCode(child, allItems)).join('\n')}
        </Group>
      `;
    case 'column':
      return `
        <Stack>
          ${children.map((child) => genFieldCode(child, allItems)).join('\n')}
        </Stack>
      `;
    default:
      return '';
  }
};
