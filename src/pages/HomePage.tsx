// @ts-ignore
import { Allotment } from 'allotment';

import { EditorSidebar } from '../sections';

export const HomePage = () => {
  return (
    <Allotment>
      <Allotment.Pane preferredSize={250}>
        <EditorSidebar />
      </Allotment.Pane>

      <Allotment.Pane>
        <div />
      </Allotment.Pane>
    </Allotment>
  );
};
