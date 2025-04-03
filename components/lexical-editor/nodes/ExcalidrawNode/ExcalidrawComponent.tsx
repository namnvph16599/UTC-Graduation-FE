/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { AppState, BinaryFiles } from '@excalidraw/excalidraw/types';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useLexicalEditable } from '@lexical/react/useLexicalEditable';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection';
import { mergeRegister } from '@lexical/utils';
import type { NodeKey } from 'lexical';
import { $getNodeByKey, CLICK_COMMAND, COMMAND_PRIORITY_LOW, isDOMNode } from 'lexical';
import type { JSX } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as React from 'react';

import { $isExcalidrawNode } from '.';
import ExcalidrawImage from './ExcalidrawImage';
import ExcalidrawModal from '../../ui/ExcalidrawModal';
import type { ExcalidrawInitialElements } from '../../ui/ExcalidrawModal';
import ImageResizer from '../../ui/ImageResizer';

export default function ExcalidrawComponent({
  nodeKey,
  data,
  width,
  height,
}: {
  data: string;
  nodeKey: NodeKey;
  width: 'inherit' | number;
  height: 'inherit' | number;
}): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const isEditable = useLexicalEditable();
  const [isModalOpen, setModalOpen] = useState<boolean>(data === '[]' && editor.isEditable());
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const captionButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  useEffect(() => {
    if (!isEditable) {
      if (isSelected) {
        clearSelection();
      }
      return;
    }
    return mergeRegister(
      editor.registerCommand(
        CLICK_COMMAND,
        (event: MouseEvent) => {
          const buttonElem = buttonRef.current;
          const eventTarget = event.target;

          if (isResizing) {
            return true;
          }

          if (buttonElem !== null && isDOMNode(eventTarget) && buttonElem.contains(eventTarget)) {
            if (!event.shiftKey) {
              clearSelection();
            }
            setSelected(!isSelected);
            if (event.detail > 1) {
              setModalOpen(true);
            }
            return true;
          }

          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    );
  }, [clearSelection, editor, isSelected, isResizing, setSelected, isEditable]);

  const deleteNode = useCallback(() => {
    setModalOpen(false);
    return editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if (node) {
        node.remove();
      }
    });
  }, [editor, nodeKey]);

  const setData = (els: ExcalidrawInitialElements, aps: Partial<AppState>, fls: BinaryFiles) => {
    return editor.update(() => {
      const node = $getNodeByKey(nodeKey);
      if ($isExcalidrawNode(node)) {
        if ((els && els.length > 0) || Object.keys(fls).length > 0) {
          node.setData(
            JSON.stringify({
              appState: aps,
              elements: els,
              files: fls,
            }),
          );
        } else {
          node.remove();
        }
      }
    });
  };

  const onResizeStart = () => {
    setIsResizing(true);
  };

  const onResizeEnd = (nextWidth: 'inherit' | number, nextHeight: 'inherit' | number) => {
    // Delay hiding the resize bars for click case
    setTimeout(() => {
      setIsResizing(false);
    }, 200);

    editor.update(() => {
      const node = $getNodeByKey(nodeKey);

      if ($isExcalidrawNode(node)) {
        node.setWidth(nextWidth);
        node.setHeight(nextHeight);
      }
    });
  };

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const { elements = [], files = {}, appState = {} } = useMemo(() => JSON.parse(data), [data]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    if (elements.length === 0) {
      editor.update(() => {
        const node = $getNodeByKey(nodeKey);
        if (node) {
          node.remove();
        }
      });
    }
  }, [editor, nodeKey, elements.length]);

  return (
    <>
      {isEditable && isModalOpen && (
        <ExcalidrawModal
          closeOnClickOutside={false}
          initialAppState={appState}
          initialElements={elements}
          initialFiles={files}
          isShown={isModalOpen}
          onClose={closeModal}
          onDelete={deleteNode}
          onSave={(els, aps, fls) => {
            setData(els, aps, fls);
            setModalOpen(false);
          }}
        />
      )}
      {elements.length > 0 && (
        <button className={`excalidraw-button ${isSelected ? 'selected' : ''}`} ref={buttonRef}>
          <ExcalidrawImage
            appState={appState}
            className='image'
            elements={elements}
            files={files}
            height={height}
            imageContainerRef={imageContainerRef}
            width={width}
          />
          {isSelected && isEditable && (
            <div
              className='image-edit-button'
              onClick={openModal}
              onMouseDown={(event) => event.preventDefault()}
              role='button'
              tabIndex={0}
            />
          )}
          {(isSelected || isResizing) && isEditable && (
            <ImageResizer
              buttonRef={captionButtonRef}
              captionsEnabled={true}
              editor={editor}
              imageRef={imageContainerRef}
              onResizeEnd={onResizeEnd}
              onResizeStart={onResizeStart}
              setShowCaption={() => null}
              showCaption={true}
            />
          )}
        </button>
      )}
    </>
  );
}
