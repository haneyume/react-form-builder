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
  required?: boolean;
  label?: string;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
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
        type: 'text',
        name: 'username',
        required: true,
        label: 'Username',
        placeholder: 'Enter your username',
      },
    },
    {
      id: uuidv4(),
      parent: 'root',
      text: 'password',
      droppable: false,
      data: {
        type: 'password',
        name: 'password',
        required: true,
        label: 'Password',
        placeholder: 'Enter your password',
      },
    },
    {
      id: idForRow,
      parent: 'root',
      text: 'row',
      droppable: true,
      data: {
        type: 'row',
      },
    },
    {
      id: uuidv4(),
      parent: idForRow,
      text: 'cancel',
      droppable: false,
      data: {
        type: 'button',
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
        type: 'button',
        name: 'submit',
        label: 'Submit',
      },
    },
  ];
};

// ----------------------------------------------

export type { DNDTreeItem, FormFieldItem, DNDTreeFormFieldItem };
