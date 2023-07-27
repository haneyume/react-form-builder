import { useContext, ReactNode } from 'react';

import {
  Stack,
  Select,
  TextInput,
  NumberInput,
  Accordion,
  Checkbox,
  Slider,
  Text,
} from '@mantine/core';

import { AppContext } from '../../contexts';
import type { FormFieldItem } from '../../types';

export const PropertySection = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  return (
    <Accordion.Item value={label}>
      <Accordion.Control className="bg-neutral-800">{label}</Accordion.Control>
      <Accordion.Panel>
        <Stack>{children}</Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export const PropertySectionWithLabelCheck = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  } else if (current.data?.type !== label) {
    return null;
  }

  return <PropertySection label={label}>{children}</PropertySection>;
};

export const PropertyFieldString = ({
  field,
}: {
  field: keyof FormFieldItem;
}) => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  }

  return (
    <TextInput
      label={field}
      value={current.data?.[field] as string}
      onChange={(e) =>
        projectCtx.setSingleItem(current.id, { [field]: e.target.value })
      }
    />
  );
};

export const PropertyFieldBoolean = ({
  field,
}: {
  field: keyof FormFieldItem;
}) => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  }

  return (
    <Checkbox
      label={field}
      checked={current.data?.[field] as boolean}
      onChange={(e) =>
        projectCtx.setSingleItem(current.id, {
          [field]: e.target.checked,
        })
      }
    />
  );
};

export const PropertyFieldEnum = ({
  field,
  data,
}: {
  field: keyof FormFieldItem;
  data: string[];
}) => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  }

  return (
    <Select
      label={field}
      data={data}
      value={current.data?.[field] as string}
      onChange={(value) =>
        projectCtx.setSingleItem(current.id, {
          [field]: value!,
        })
      }
    />
  );
};

export const PropertyFieldNumber = ({
  field,
}: {
  field: keyof FormFieldItem;
}) => {
  const projectCtx = useContext(AppContext);

  const current = projectCtx.currentFormFieldItem;
  if (!current) {
    return null;
  }

  return (
    <NumberInput
      label={field}
      value={current.data?.[field] as number}
      onChange={(value) =>
        projectCtx.setSingleItem(current.id, {
          [field]: Number(value),
        })
      }
    />
  );
};
