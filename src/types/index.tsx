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
  name: string;
  type: string;
  required: boolean;
  label: string;
  placeholder: string;
}

type DNDTreeFormFieldItem = DNDTreeItem<FormFieldItem>;

// ----------------------------------------------

export const defaultFormFieldItems: () => DNDTreeFormFieldItem[] = () => {
  return [
    {
      id: uuidv4(),
      parent: 'root',
      text: 'username',
      droppable: false,
      data: {
        name: 'username',
        type: 'text',
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
        name: 'password',
        type: 'password',
        required: true,
        label: 'Password',
        placeholder: 'Enter your password',
      },
    },
  ];
};

// ----------------------------------------------

export type { DNDTreeItem, FormFieldItem, DNDTreeFormFieldItem };
