import { useContext, useRef, useEffect } from 'react';

import { Group, Stack } from '@mantine/core';
import {
  IconCaretRight,
  IconCaretDown,
  IconForms,
  IconCheckbox,
  IconSelect,
  IconAlignBoxLeftTop,
  IconHandClick,
  IconLayoutRows,
  IconLayoutColumns,
} from '@tabler/icons-react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Tree, TreeMethods } from '@minoru/react-dnd-treeview';

import clsx from 'clsx';

import { AppContext } from '../contexts';
import { NewFormFieldButton, NewLayoutButton } from '../modals';

export const EditorSidebar = () => {
  const projectCtx = useContext(AppContext);

  const treeRef = useRef<TreeMethods>(null);

  useEffect(() => {
    treeRef.current?.openAll();
  }, [treeRef]);

  const handleDrop = (newTreeData: any) => {
    projectCtx.setFormFieldItems(newTreeData);
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case 'TextInput':
      case 'NumberInput':
      case 'PasswordInput':
        return <IconForms size={14} />;
      case 'Checkbox':
        return <IconCheckbox size={14} />;
      case 'Select':
        return <IconSelect size={14} />;
      case 'Textarea':
        return <IconAlignBoxLeftTop size={14} />;
      case 'Button':
        return <IconHandClick size={14} />;
      case 'Group':
        return <IconLayoutRows size={14} />;
      case 'Stack':
        return <IconLayoutColumns size={14} />;
      default:
        return <IconForms size={14} />;
    }
  };

  return (
    <Stack spacing={0}>
      <SidebarHeader />

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
              className={clsx(
                'flex items-center space-x-2 cursor-pointer hover:bg-gray-800',
                projectCtx.selectedFormFieldId === node.id && 'bg-gray-700',
              )}
              style={{ paddingLeft: 10 + depth * 20 }}
              onClick={() => {
                if (node.droppable) {
                  onToggle();
                }

                projectCtx.setSelectedFormFieldId(node.id as string);
              }}
            >
              {node.droppable && isOpen && <IconCaretDown size={14} />}
              {node.droppable && !isOpen && <IconCaretRight size={14} />}

              {renderIcon(node.data?.type || '')}

              <div>{node.text}</div>
            </div>
          )}
        />
      </DndProvider>
    </Stack>
  );
};

const SidebarHeader = () => {
  return (
    <Group position="right" spacing={5}>
      <NewFormFieldButton />
      <NewLayoutButton />
    </Group>
  );
};
