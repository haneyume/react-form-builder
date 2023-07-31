import { useContext } from 'react';

import { Stack, Accordion } from '@mantine/core';

import { AppContext } from '../contexts';

import { PropertySection } from './property/PropertyUIs';
import {
  // ContextPropertyFieldString,
  ContextPropertyFieldEnum,
} from './property/ContextPropertyUIs';

export const CodeSidebar = () => {
  const defaultValue = ['Code Type', 'Modal Button Type'];

  return (
    <Stack>
      <Accordion defaultValue={defaultValue} chevronPosition="left" multiple>
        <CodeTypePanel />
        <ModalButtonTypePanel />
      </Accordion>
    </Stack>
  );
};

const CodeTypePanel = () => {
  return (
    <PropertySection label="Code Type">
      <ContextPropertyFieldEnum field="codeType" data={['form', 'modal']} />
    </PropertySection>
  );
};

const ModalButtonTypePanel = () => {
  const projectCtx = useContext(AppContext);

  if (projectCtx.globalState.codeType !== 'modal') {
    return null;
  }

  return (
    <PropertySection label="Modal Button Type">
      <ContextPropertyFieldEnum
        field="modalButtonType"
        data={['button', 'icon']}
      />
    </PropertySection>
  );
};
