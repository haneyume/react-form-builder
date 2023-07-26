// @ts-ignore
import { Allotment } from 'allotment';

import { CodeSidebar, CodePreview } from '../sections';

export const CodePage = () => {
  return (
    <Allotment>
      <Allotment.Pane preferredSize={200}>
        <CodeSidebar />
      </Allotment.Pane>

      <Allotment.Pane>
        <CodePreview />
      </Allotment.Pane>
    </Allotment>
  );
};
