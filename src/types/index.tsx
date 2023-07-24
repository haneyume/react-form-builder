import { v4 as uuidv4 } from 'uuid';

interface DNDTreeItem<T> {
  id: string;
  parent: string;
  text: string;
  droppable?: boolean;
  data?: T;
}

// ----------------------------------------------

interface FormFieldItem {
  type: string;
  name?: string;
  label?: string;
  placeholder?: string;
  withAsterisk?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  align?: string;
  justify?: string;
  position?: string;
  grow?: boolean;
  cols?: number;
  withBorder?: boolean;
}

type DNDTreeFormFieldItem = DNDTreeItem<FormFieldItem>;

// ----------------------------------------------

export const defaultFormFieldItems: () => DNDTreeFormFieldItem[] = () => {
  const idForRow = uuidv4();

  return [
    {
      id: uuidv4(),
      parent: 'root',
      text: 'username',
      droppable: false,
      data: {
        type: 'TextInput',
        name: 'username',
        label: 'Username',
        placeholder: 'Enter your username',
        withAsterisk: true,
      },
    },
    {
      id: uuidv4(),
      parent: 'root',
      text: 'password',
      droppable: false,
      data: {
        type: 'PasswordInput',
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        withAsterisk: true,
      },
    },
    {
      id: idForRow,
      parent: 'root',
      text: 'Group',
      droppable: true,
      data: {
        type: 'Group',
        position: 'right',
      },
    },
    {
      id: uuidv4(),
      parent: idForRow,
      text: 'cancel',
      droppable: false,
      data: {
        type: 'Button',
        name: 'cancel',
        label: 'Cancel',
      },
    },
    {
      id: uuidv4(),
      parent: idForRow,
      text: 'submit',
      droppable: false,
      data: {
        type: 'Button',
        name: 'submit',
        label: 'Submit',
      },
    },
  ];
};

// ----------------------------------------------

export type { DNDTreeItem, FormFieldItem, DNDTreeFormFieldItem };
