import { useContext } from 'react';

import {
  Modal,
  Stack,
  Button,
  TextInput,
  ActionIcon,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconListDetails } from '@tabler/icons-react';

import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { AppContext } from '../contexts';

export const NewFormFieldButton = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Tooltip label="Add a form field">
        <ActionIcon onClick={open}>
          <IconListDetails size={18} />
        </ActionIcon>
      </Tooltip>

      <ModalInstance opened={opened} close={close} />
    </>
  );
};

const ModalInstance = ({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) => {
  const projectCtx = useContext(AppContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{
    name: string;
  }>();

  const onSubmit = handleSubmit((data) => {
    projectCtx.setFormFieldItems([
      ...projectCtx.formFieldItems,
      {
        id: uuidv4(),
        parent: 'root',
        text: data.name,
        droppable: false,
        data: {
          name: data.name,
          type: 'text',
          required: true,
          label: data.name,
          placeholder: `Enter your ${data.name}`,
        },
      },
    ]);

    close();

    reset({
      name: '',
    });
  });

  return (
    <Modal opened={opened} onClose={close} title="New Form Field" centered>
      <Stack>
        <TextInput
          label="Name"
          placeholder="Name"
          withAsterisk
          {...register('name', { required: true })}
          error={errors.name && 'Name is required'}
        />

        <Button className="w-full" variant="light" onClick={onSubmit}>
          Create
        </Button>
      </Stack>
    </Modal>
  );
};
