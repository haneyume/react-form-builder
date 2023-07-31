import { useEffect, useContext } from 'react';

import {
  Group,
  TextInput,
  Box,
  Button,
  Center,
  ActionIcon,
  Text,
  Card,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconGripVertical, IconX } from '@tabler/icons-react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { AppContext } from '../../contexts';

export const PropertyListItems = () => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  }

  const form = useForm({
    initialValues: {
      items: [
        { label: 'Red', value: 'red' },
        { label: 'Green', value: 'green' },
        { label: 'Blue', value: 'blue' },
      ],
    },
  });

  useEffect(() => {
    if (current.data?.data) {
      form.setValues({ items: current.data.data });
    }
  }, []);

  useEffect(() => {
    projectCtx.setSingleItem(current.id, {
      data: form.values.items,
    });
  }, [form.values]);

  const fields = form.values.items.map((_, index) => (
    <Draggable key={index} index={index} draggableId={index.toString()}>
      {(provided) => (
        <Group
          ref={provided.innerRef}
          mt="xs"
          noWrap
          {...provided.draggableProps}
        >
          <Center {...provided.dragHandleProps}>
            <IconGripVertical size="1.2rem" />
          </Center>
          <TextInput
            placeholder="label"
            {...form.getInputProps(`items.${index}.label`)}
          />
          <TextInput
            placeholder="value"
            {...form.getInputProps(`items.${index}.value`)}
          />
          <ActionIcon onClick={() => form.removeListItem('items', index)}>
            <IconX size="1.2rem" />
          </ActionIcon>
        </Group>
      )}
    </Draggable>
  ));

  return (
    <Box>
      <Text size={'0.875rem'}>data</Text>

      <Card withBorder>
        <DragDropContext
          onDragEnd={({ destination, source }) =>
            form.reorderListItem('items', {
              from: source.index,
              to: destination!.index,
            })
          }
        >
          <Droppable droppableId="dnd-list" direction="vertical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {fields}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <Group mt="md">
          <Button
            fullWidth
            onClick={() =>
              form.insertListItem('items', { label: '', value: '' })
            }
          >
            Add
          </Button>
        </Group>
      </Card>
    </Box>
  );
};
