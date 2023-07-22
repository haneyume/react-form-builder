import {
  TextInput,
  NumberInput,
  PasswordInput,
  Checkbox,
  Select,
  Textarea,
  Slider,
  ColorInput,
  Radio,
  Switch,
  Button,
  Group,
  Stack,
  Box,
  Text,
} from '@mantine/core';
import { useForm, isNotEmpty, isEmail, isInRange } from '@mantine/form';

export const TestPage = () => {
  const form = useForm({
    initialValues: {
      text: '',
      number: 0,
      password: '',
      email: '',
      checkbox: false,
      select: 'opt1',
      textarea: '',
      range: 0,
      color: '#ffffff',
      radio: '',
      switch: false,
      checkboxGroup: [],
    },
    validate: {
      text: isNotEmpty('Field is required'),
      email: isEmail('Invalid email'),
      number: isInRange({ min: 1, max: 3 }, '1~3'),
    },
  });

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack>
          <TextInput
            label="text"
            placeholder="text"
            {...form.getInputProps('text')}
          />

          <NumberInput
            label="number"
            placeholder="number"
            {...form.getInputProps('number')}
          />

          <PasswordInput
            label="password"
            placeholder="password"
            {...form.getInputProps('password')}
          />

          <TextInput
            withAsterisk
            label="email"
            placeholder="email"
            {...form.getInputProps('email')}
          />

          <Checkbox
            label="checkbox"
            {...form.getInputProps('checkbox', { type: 'checkbox' })}
          />

          <Select
            label="select"
            placeholder="select"
            data={[
              { value: 'opt1', label: 'opt1' },
              { value: 'opt2', label: 'opt2' },
              { value: 'opt3', label: 'opt3' },
            ]}
            {...form.getInputProps('select')}
          />

          <Textarea
            label="textarea"
            placeholder="textarea"
            {...form.getInputProps('textarea')}
          />

          <Slider label="range" {...form.getInputProps('range')} />

          <ColorInput
            label="color"
            placeholder="color"
            {...form.getInputProps('color')}
          />

          <Radio.Group
            label="radio"
            description="radio"
            withAsterisk
            {...form.getInputProps('radio')}
          >
            <Group mt="xs">
              <Radio value="react" label="React" />
              <Radio value="svelte" label="Svelte" />
              <Radio value="ng" label="Angular" />
              <Radio value="vue" label="Vue" />
            </Group>
          </Radio.Group>

          <Switch
            label="switch"
            {...form.getInputProps('switch', { type: 'checkbox' })}
          />

          <Checkbox.Group
            label="checkboxGroup"
            description="checkboxGroup"
            withAsterisk
            {...form.getInputProps('checkboxGroup')}
          >
            <Group mt="xs">
              <Checkbox value="react" label="React" />
              <Checkbox value="svelte" label="Svelte" />
              <Checkbox value="ng" label="Angular" />
              <Checkbox value="vue" label="Vue" />
            </Group>
          </Checkbox.Group>

          <Group position="right">
            <Button type="submit">Submit</Button>
          </Group>
        </Stack>
      </form>

      <Text mt="lg">{JSON.stringify(form.values, null, 2)}</Text>
    </Box>
  );
};
