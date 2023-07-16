import Editor from '@monaco-editor/react';

export const CodePreview = () => {
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
