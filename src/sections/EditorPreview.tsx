import { useContext } from 'react';

import {
  // Layouts
  Paper,
  Group,
  Stack,

  // Form fields
  TextInput,
  NumberInput,
  PasswordInput,
  Checkbox,
  Select,
  Textarea,
  Button,

  // Other
  Slider,
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
    case 'TextInput':
      return (
        <TextInput
          label={item.data.label}
          placeholder={item.data.placeholder}
          withAsterisk={item.data.required}
        />
      );
    case 'NumberInput':
      return (
        <NumberInput
          label={item.data.label}
          placeholder={item.data.placeholder}
          withAsterisk={item.data.required}
        />
      );
    case 'PasswordInput':
      return (
        <PasswordInput
          label={item.data.label}
          placeholder={item.data.placeholder}
          withAsterisk={item.data.required}
        />
      );
    case 'Checkbox':
      return (
        <Checkbox label={item.data.label} placeholder={item.data.placeholder} />
      );
    case 'Select':
      return (
        <Select
          label={item.data.label}
          placeholder={item.data.placeholder}
          withAsterisk={item.data.required}
          data={[]}
        />
      );
    case 'Textarea':
      return (
        <Textarea
          label={item.data.label}
          placeholder={item.data.placeholder}
          withAsterisk={item.data.required}
        />
      );
    case 'Slider':
      return <Slider label={item.data.label} />;
    case 'Button':
      return <Button variant="light">{item.data.label}</Button>;
    case 'Group':
      return (
        <Group position="right">
          {children.map((child) => (
            <RenderField key={child.id} item={child} allItems={allItems} />
          ))}
        </Group>
      );
    case 'Stack':
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
