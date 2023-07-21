import { useContext } from 'react';

import {
  Paper,
  Stack,
  TextInput,
  PasswordInput,
  Checkbox,
  Slider,
  Select,
  Textarea,
  Group,
  Button,
} from '@mantine/core';

import { AppContext } from '../contexts';
import type { DNDTreeFormFieldItem } from '../types';

export const EditorPreview = () => {
  const projectCtx = useContext(AppContext);

  return (
    <div className="w-full h-full bg-pattern flex justify-center p-10">
      <Paper className="w-1/2 p-5">
        <Stack>
          {projectCtx.formFieldItems
            .filter((item) => item.parent === 'root')
            .map((item) => {
              return (
                <RenderField
                  key={item.id}
                  item={item}
                  allItems={projectCtx.formFieldItems}
                />
              );
            })}
        </Stack>
      </Paper>
    </div>
  );
};

const RenderField = ({
  item,
  allItems,
}: {
  item: DNDTreeFormFieldItem;
  allItems: DNDTreeFormFieldItem[];
}) => {
  const uuid = item.id;
  const children = allItems.filter((child) => child.parent === uuid);

  switch (item.data?.type) {
    case 'text':
      return (
        <TextInput
          label={item.data.label}
          placeholder={item.data.placeholder}
          withAsterisk={item.data.required}
        />
      );
    case 'password':
      return (
        <PasswordInput
          label={item.data.label}
          placeholder={item.data.placeholder}
          withAsterisk={item.data.required}
        />
      );
    case 'checkbox':
      return (
        <Checkbox label={item.data.label} placeholder={item.data.placeholder} />
      );
    case 'range':
      return <Slider label={item.data.label} />;
    case 'select':
      return (
        <Select
          label={item.data.label}
          placeholder={item.data.placeholder}
          withAsterisk={item.data.required}
          data={[]}
        />
      );
    case 'textarea':
      return (
        <Textarea
          label={item.data.label}
          placeholder={item.data.placeholder}
          withAsterisk={item.data.required}
        />
      );
    case 'button':
      return <Button variant="light">{item.data.label}</Button>;
    case 'row':
      return (
        <Group position="right">
          {children.map((child) => (
            <RenderField key={child.id} item={child} allItems={allItems} />
          ))}
        </Group>
      );
    case 'column':
      return (
        <Stack>
          {children.map((child) => (
            <RenderField key={child.id} item={child} allItems={allItems} />
          ))}
        </Stack>
      );
    default:
      return <div />;
  }
};
