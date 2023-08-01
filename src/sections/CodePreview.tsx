import { useContext, useEffect, useState } from 'react';

import Editor from '@monaco-editor/react';

import prettier from 'prettier/standalone';
import prettierPluginBabel from 'prettier/plugins/babel';

// @ts-ignore
import prettierPluginEstree from 'prettier/plugins/estree';

import { AppContext } from '../contexts';
import type { DNDTreeFormFieldItem, GlobalState } from '../types';

export const CodePreview = () => {
  const projectCtx = useContext(AppContext);

  const [code, setCode] = useState<string>('');

  useEffect(() => {
    let _code = genCode(projectCtx.formFieldItems, projectCtx.globalState);

    // console.log(_code);

    prettier
      .format(_code, {
        parser: 'babel',
        plugins: [prettierPluginBabel, prettierPluginEstree],
      })
      .then((formattedCode) => {
        setCode(formattedCode);
      });
  }, [projectCtx.globalState]);

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

const genCode = (
  allItems: DNDTreeFormFieldItem[],
  globalState: GlobalState,
) => {
  const { codeType, modalButtonType } = globalState;

  const importCode = genImportCode(allItems, codeType, modalButtonType);
  const hookCode = genHookCode(allItems, codeType);

  const formFieldCode = allItems
    .filter((item) => item.parent === 'root')
    .map((item) => {
      return genFieldCode(item, allItems);
    })
    .join('\n');

  const componentCode = genComponentCode(
    hookCode,
    formFieldCode,
    codeType,
    modalButtonType,
  );

  return importCode + componentCode;
};

const genImportCode = (
  allItems: DNDTreeFormFieldItem[],
  codeType: string,
  modalButtonType: string,
) => {
  // Extract all import @mantine/core code
  let importMantineCore = allItems
    .filter((item) => item.data?.type)
    .map((item) => item.data?.type);
  if (codeType === 'modal' && modalButtonType === 'button') {
    importMantineCore = [...importMantineCore, 'Modal', 'Button'];
  }
  if (codeType === 'modal' && modalButtonType === 'icon') {
    importMantineCore = [...importMantineCore, 'Modal', 'ActionIcon'];
  }
  importMantineCore = [...importMantineCore, 'Stack'];
  importMantineCore = [...new Set(importMantineCore)].sort();

  // Extract all import @mantine/form code
  let importMantineForm = allItems
    .filter((item) => item.data?.validateType)
    .map((item) => item.data?.validateType);
  importMantineForm = [...new Set(importMantineForm)].sort();
  importMantineForm = ['useForm', ...importMantineForm];

  let result = '';

  if (importMantineCore.length > 0) {
    result += `import {${importMantineCore.join(',')}} from '@mantine/core';\n`;
  }
  if (importMantineForm.length > 0) {
    result += `import {${importMantineForm.join(',')}} from '@mantine/form';\n`;
  }
  if (codeType === 'modal') {
    result += `import { useDisclosure } from '@mantine/hooks';\n`;
  }
  if (codeType === 'modal' && modalButtonType === 'icon') {
    result += `import { IconSettings } from '@tabler/icons-react';\n`;
  }

  return result + '\n';
};

const genHookCode = (
  allItems: DNDTreeFormFieldItem[],
  codeType: string,
): string => {
  // Extract all form initial values code
  const initialValues = allItems
    .filter((items) => {
      return items.data?.name && items.data?.type !== 'Button';
    })
    .map((item) => {
      return `${item.data?.name}: '${''}',`;
    })
    .join('\n');

  // Extract all form validate code
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

  let modalHookCode = '';
  if (codeType === 'modal') {
    modalHookCode =
      'const [opened, { open, close }] = useDisclosure(false);\n\n';
  }

  const formHookCode = `
  const form = useForm({
    initialValues: {
      ${initialValues}
    },
    validate: {
      ${validate}
    },
  });\n`;

  return modalHookCode + formHookCode;
};

const genComponentCode = (
  hookCode: string,
  formFieldCode: string,
  codeType: string,
  modalButtonType: string,
): string => {
  if (codeType === 'form') {
    return `export const Form = () => {
  ${hookCode}

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        // TODO: Submit form
        console.log(values);
      })}
    >
      <Stack>
        ${formFieldCode}
      </Stack>
    </form>
  );
};  
`;
  } else if (codeType === 'modal') {
    let buttonCode = '';
    if (modalButtonType === 'button') {
      buttonCode = `<Button variant="light" onClick={open}>Open modal</Button>`;
    } else if (modalButtonType === 'icon') {
      buttonCode = `<ActionIcon onClick={open}>
      <IconSettings size="1.125rem" />
      </ActionIcon>`;
    }

    return `export const Modal = () => {
  ${hookCode}

  return (
    <>
      ${buttonCode}

      <Model
        opened={opened}
        onClose={close}
        title="Modal title"
        centered
      >
        <form
          onSubmit={form.onSubmit((values) => {
            // TODO: Submit form
            console.log(values);

            close();
          })}
        >
          <Stack>
            ${formFieldCode}
          </Stack>
        </form>
      </Model>
    </>
  );
};  
`;
  }

  return '';
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
    // readonly,
    // disabled,
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
