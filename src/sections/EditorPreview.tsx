import { useContext } from 'react';

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
  Paper,
  Flex,
  Group,
  Stack,
  SimpleGrid,
  Card,

  // Typography
  Text,
  Title,

  // Other
  Slider,
} from '@mantine/core';

import { AppContext } from '../contexts';
import type { DNDTreeFormFieldItem } from '../types';

export const EditorPreview = () => {
  const projectCtx = useContext(AppContext);

  return (
    <div className="w-full h-full bg-pattern flex justify-center items-center p-10">
      <Paper className="p-5 w-1/2 resize overflow-auto">
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
          withAsterisk={item.data.withAsterisk}
        />
      );
    case 'NumberInput':
      return (
        <NumberInput
          label={item.data.label}
          placeholder={item.data.placeholder}
          withAsterisk={item.data.withAsterisk}
        />
      );
    case 'PasswordInput':
      return (
        <PasswordInput
          label={item.data.label}
          placeholder={item.data.placeholder}
          withAsterisk={item.data.withAsterisk}
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
          withAsterisk={item.data.withAsterisk}
          data={[]}
        />
      );
    case 'Textarea':
      return (
        <Textarea
          label={item.data.label}
          placeholder={item.data.placeholder}
          withAsterisk={item.data.withAsterisk}
        />
      );
    case 'Slider':
      return (
        <Slider label={item.data.label} placeholder={item.data.placeholder} />
      );
    case 'Button':
      return (
        <Button
          variant={item.data.buttonVariant}
          type={item.data.buttonType as any}
        >
          {item.data.label}
        </Button>
      );
    case 'Flex':
      return (
        <Flex
          direction={item.data.direction as any}
          wrap={item.data.wrap as any}
          align={item.data.align}
          justify={item.data.justify}
        >
          {children.map((child) => (
            <RenderField key={child.id} item={child} allItems={allItems} />
          ))}
        </Flex>
      );
    case 'Group':
      return (
        <Group position={item.data.position as any} grow={item.data.grow}>
          {children.map((child) => (
            <RenderField key={child.id} item={child} allItems={allItems} />
          ))}
        </Group>
      );
    case 'Stack':
      return (
        <Stack align={item.data.align} justify={item.data.justify}>
          {children.map((child) => (
            <RenderField key={child.id} item={child} allItems={allItems} />
          ))}
        </Stack>
      );
    case 'SimpleGrid':
      return (
        <SimpleGrid cols={item.data.cols}>
          {children.map((child) => (
            <RenderField key={child.id} item={child} allItems={allItems} />
          ))}
        </SimpleGrid>
      );
    case 'Card':
      return (
        <Card withBorder={item.data.withBorder}>
          {children.map((child) => (
            <RenderField key={child.id} item={child} allItems={allItems} />
          ))}
        </Card>
      );
    case 'Text':
      return <Text>{item.data.text}</Text>;
    case 'Title':
      return <Title order={item.data.order as any}>{item.data.text}</Title>;
    default:
      return <div />;
  }
};
