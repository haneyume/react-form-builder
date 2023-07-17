import { useContext } from 'react';

import Editor from '@monaco-editor/react';

import { AppContext } from '../contexts';

export const CodeSidebar = () => {
  const projectCtx = useContext(AppContext);

  return (
    <Editor
      height="100%"
      theme="vs-dark"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      options={{}}
    />
  );
};
