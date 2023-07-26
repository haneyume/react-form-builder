# react-form-builder

## Supported Components

| Component     |     |
| ------------- | --- |
| TextInput     | ✓   |
| NumberInput   | ✓   |
| PasswordInput | ✓   |
| Checkbox      | ✓   |
| Select        | ✓   |
| Textarea      | ✓   |
| Slider        |     |
| ColorInput    |     |
| Radio         |     |
| Switch        |     |
| Button        | ✓   |

## Supported Layouts

| Layout |     |
| ------ | --- |
| Group  | ✓   |
| Stack  | ✓   |
| Grid   | ✓   |
| Card   | ✓   |

## Supported Validation

| Validation |     |
| ---------- | --- |
| isNotEmpty | ✓   |
| isEmail    | ✓   |
| isInRange  |     |
| hasLength  |     |
| matches    |     |

## Component Props

### TextInput

| Prop Name    | Type    |
| ------------ | ------- |
| label        | string  |
| placeholder  | string  |
| withAsterisk | boolean |

### NumberInput

| Prop Name    | Type    |
| ------------ | ------- |
| label        | string  |
| placeholder  | string  |
| withAsterisk | boolean |

### PasswordInput

| Prop Name    | Type    |
| ------------ | ------- |
| label        | string  |
| placeholder  | string  |
| withAsterisk | boolean |

### Checkbox

| Prop Name   | Type   |
| ----------- | ------ |
| label       | string |
| placeholder | string |

### Select

| Prop Name    | Type    |
| ------------ | ------- |
| label        | string  |
| placeholder  | string  |
| withAsterisk | boolean |
| data         | Array   |

### Textarea

| Prop Name    | Type    |
| ------------ | ------- |
| label        | string  |
| placeholder  | string  |
| withAsterisk | boolean |

### Button

| Prop Name | Type   |
| --------- | ------ |
| label     | string |
| variant   | string |
| type      | string |

### Flex

| Prop Name | Type           |
| --------- | -------------- |
| direction | FlexDirection  |
| wrap      | FlexWrap       |
| align     | AlignItems     |
| justify   | JustifyContent |
| gap       | SpacingValue   |
| rowGap    | SpacingValue   |
| columnGap | SpacingValue   |

### Group

| Prop Name | Type                       |
| --------- | -------------------------- |
| position  | left, center, right, apart |
| grow      | boolean                    |

### Stack

| Prop Name | Type           |
| --------- | -------------- |
| align     | AlignItems     |
| justify   | JustifyContent |

### SimpleGrid

| Prop Name | Type   |
| --------- | ------ |
| cols      | number |

### Card

| Prop Name  | Type    |
| ---------- | ------- |
| withBorder | boolean |

### Text

| Prop Name | Type   |
| --------- | ------ |
| text      | string |

### Title

| Prop Name | Type             |
| --------- | ---------------- |
| text      | string           |
| order     | 1, 2, 3, 4, 5, 6 |
