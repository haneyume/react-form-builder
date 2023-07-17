import { useContext, useEffect, useState } from 'react';

import Editor from '@monaco-editor/react';

import { AppContext } from '../contexts';

export const CodePreview = () => {
  const projectCtx = useContext(AppContext);

  const [code, setCode] = useState<string>('');

  useEffect(() => {
    let _code = '';
    for (let i = 0; i < projectCtx.formFieldItems.length; i++) {
      _code += 'const a = 0;\n';
    }

    setCode(_code);
  }, []);

  return (
    <Editor
      height="100%"
      theme="vs-dark"
      defaultLanguage="typescript"
      defaultValue="// some comment"
      options={{}}
      value={code}
    />
  );
};
