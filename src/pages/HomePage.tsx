// @ts-ignore
import { Allotment } from 'allotment';

import {
  EditorSidebar,
  EditorPreview,
  EditorPropertyEditor,
} from '../sections';

export const HomePage = () => {
  return (
    <Allotment>
      <Allotment.Pane preferredSize={250}>
        <EditorSidebar />
      </Allotment.Pane>

      <Allotment.Pane>
        <EditorPreview />
      </Allotment.Pane>

      <Allotment.Pane preferredSize={400}>
        <EditorPropertyEditor />
      </Allotment.Pane>
    </Allotment>
  );
};
