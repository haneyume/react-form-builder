import { useContext, useRef, useEffect } from 'react';

import { Stack } from '@mantine/core';
import {
  IconCaretRight,
  IconCaretDown,
  IconFolder,
  IconFileCode,
} from '@tabler/icons-react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Tree, TreeMethods } from '@minoru/react-dnd-treeview';

import { AppContext } from '../contexts';

export const EditorSidebar = () => {
  const projectCtx = useContext(AppContext);

  const treeRef = useRef<TreeMethods>(null);

  useEffect(() => {
    treeRef.current?.openAll();
  }, [treeRef]);

  const handleDrop = (newTreeData: any) => {
    projectCtx.setFormFieldItems(newTreeData);
  };

  return (
    <Stack>
      <DndProvider backend={HTML5Backend}>
        <Tree
          ref={treeRef}
          tree={projectCtx.formFieldItems}
          rootId={'root'}
          onDrop={handleDrop}
          sort={false}
          insertDroppableFirst={false}
          canDrop={(_, { dragSource, dropTargetId }) => {
            if (dragSource?.parent === dropTargetId) {
              return true;
            }
          }}
          dropTargetOffset={5}
          placeholderRender={(_, { depth }) => (
            <div className="w-full flex" style={{ marginLeft: depth * 20 }}>
              <div className="flex-1 h-[2px] bg-[#007fd4]" />
            </div>
          )}
          render={(node, { depth, isOpen, onToggle }) => (
            <div
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-800"
              style={{ paddingLeft: depth * 20 }}
              onClick={() => {
                if (node.droppable) {
                  onToggle();
                }
              }}
            >
              {node.droppable && isOpen && <IconCaretDown size={14} />}
              {node.droppable && !isOpen && <IconCaretRight size={14} />}

              {node.droppable ? (
                <IconFolder size={14} />
              ) : (
                <IconFileCode size={14} />
              )}

              <div>{node.text}</div>
            </div>
          )}
        />
      </DndProvider>
    </Stack>
  );
};
