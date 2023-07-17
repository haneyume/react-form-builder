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
} from '@mantine/core';

import { AppContext } from '../contexts';
import type { DNDTreeFormFieldItem } from '../types';

export const EditorPreview = () => {
  const projectCtx = useContext(AppContext);

  return (
    <div className="w-full h-full bg-pattern flex justify-center p-10">
      <Paper className="w-1/2 p-5">
        <Stack>
          {projectCtx.formFieldItems.map((item, index) => {
            return <RenderField key={index} item={item} />;
          })}
        </Stack>
      </Paper>
    </div>
  );
};

const RenderField = ({ item }: { item: DNDTreeFormFieldItem }) => {
  if (!item.data) {
    return null;
  }

  switch (item.data.type) {
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
    default:
      return <div />;
  }
};
