import {
  TextInput,
  NumberInput,
  Checkbox,
  Select,
  Textarea,
  Button,
  Group,
  Stack,
  Box,
  Text,
} from '@mantine/core';
import { useForm, isEmail, isNotEmpty, isInRange } from '@mantine/form';

export const TestPage = () => {
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
      age: 0,
      about: 'dsd',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      age: isInRange(
        { min: 18, max: 99 },
        'You must be 18-99 years old to register',
      ),
    },
  });

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack>
          <TextInput
            // withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('emaidl')}
          />

          <Select
            label="Select your favorite color"
            placeholder="Pick color"
            data={[
              { value: 'blue', label: 'Blue' },
              { value: 'green', label: 'Green' },
              { value: 'red', label: 'Red' },
            ]}
            {...form.getInputProps('color')}
          />

          <NumberInput
            label="Age"
            placeholder="Age"
            {...form.getInputProps('age')}
          />

          <Textarea
            label="Tell us about yourself"
            placeholder="I am..."
            {...form.getInputProps('about')}
          />

          <Checkbox
            label="I agree to sell my privacy"
            {...form.getInputProps('termsOfService', { type: 'checkbox' })}
          />

          <Group position="right">
            <Button type="submit">Submit</Button>
          </Group>
        </Stack>
      </form>

      <Text mt="lg">{JSON.stringify(form.values, null, 2)}</Text>
    </Box>
  );
};
