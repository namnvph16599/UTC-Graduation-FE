/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  CODE_LANGUAGE_MAP,
  getLanguageFriendlyName,
} from '@lexical/code';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $isListNode, ListNode } from '@lexical/list';
import { INSERT_EMBED_COMMAND } from '@lexical/react/LexicalAutoEmbedPlugin';
import { INSERT_HORIZONTAL_RULE_COMMAND } from '@lexical/react/LexicalHorizontalRuleNode';
import { $isHeadingNode } from '@lexical/rich-text';
import { $getSelectionStyleValueForProperty, $isParentElementRTL, $patchStyleText } from '@lexical/selection';
import { $isTableNode, $isTableSelection } from '@lexical/table';
import {
  $findMatchingParent,
  $getNearestNodeOfType,
  $isEditorIsNestedEditor,
  IS_APPLE,
  mergeRegister,
} from '@lexical/utils';
import {
  $getNodeByKey,
  $getRoot,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  LexicalEditor,
  NodeKey,
  OUTDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import type { JSX } from 'react';
import { Dispatch, useCallback, useEffect, useState } from 'react';
import * as React from 'react';

import { blockTypeToBlockName, useToolbarState } from '../../context/ToolbarContext';
import useModal from '../../hooks/useModal';
import catTypingGif from '../../images/cat-typing.gif';
import { $createStickyNode } from '../../nodes/StickyNode';
import DropDown, { DropDownItem } from '../../ui/DropDown';
import DropdownColorPicker from '../../ui/DropdownColorPicker';
import { getSelectedNode } from '../../utils/getSelectedNode';
import { sanitizeUrl } from '../../utils/url';
import { EmbedConfigs } from '../AutoEmbedPlugin';
import { INSERT_COLLAPSIBLE_COMMAND } from '../CollapsiblePlugin';
import { InsertEquationDialog } from '../EquationsPlugin';
import { INSERT_EXCALIDRAW_COMMAND } from '../ExcalidrawPlugin';
import { INSERT_IMAGE_COMMAND, InsertImageDialog, InsertImagePayload } from '../ImagesPlugin';
import { InsertInlineImageDialog } from '../InlineImagePlugin';
import InsertLayoutDialog from '../LayoutPlugin/InsertLayoutDialog';
import { INSERT_PAGE_BREAK } from '../PageBreakPlugin';
import { InsertPollDialog } from '../PollPlugin';
import { SHORTCUTS } from '../ShortcutsPlugin/shortcuts';
import { InsertTableDialog } from '../TablePlugin';
import FontSize from './fontSize';
import {
  clearFormatting,
  formatBulletList,
  formatCheckList,
  formatCode,
  formatHeading,
  formatNumberedList,
  formatParagraph,
  formatQuote,
} from './utils';

const rootTypeToRootName = {
  root: 'Root',
  table: 'Table',
};

function getCodeLanguageOptions(): [string, string][] {
  const options: [string, string][] = [];

  for (const [lang, friendlyName] of Object.entries(CODE_LANGUAGE_FRIENDLY_NAME_MAP)) {
    options.push([lang, friendlyName]);
  }

  return options;
}

const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();

const FONT_FAMILY_OPTIONS: [string, string][] = [
  ['Arial', 'Arial'],
  ['Courier New', 'Courier New'],
  ['Georgia', 'Georgia'],
  ['Times New Roman', 'Times New Roman'],
  ['Trebuchet MS', 'Trebuchet MS'],
  ['Verdana', 'Verdana'],
];

const FONT_SIZE_OPTIONS: [string, string][] = [
  ['10px', '10px'],
  ['11px', '11px'],
  ['12px', '12px'],
  ['13px', '13px'],
  ['14px', '14px'],
  ['15px', '15px'],
  ['16px', '16px'],
  ['17px', '17px'],
  ['18px', '18px'],
  ['19px', '19px'],
  ['20px', '20px'],
];

const ELEMENT_FORMAT_OPTIONS: {
  [key in Exclude<ElementFormatType, ''>]: {
    icon: string;
    iconRTL: string;
    name: string;
  };
} = {
  center: {
    icon: 'center-align',
    iconRTL: 'center-align',
    name: 'Center Align',
  },
  end: {
    icon: 'right-align',
    iconRTL: 'left-align',
    name: 'End Align',
  },
  justify: {
    icon: 'justify-align',
    iconRTL: 'justify-align',
    name: 'Justify Align',
  },
  left: {
    icon: 'left-align',
    iconRTL: 'left-align',
    name: 'Left Align',
  },
  right: {
    icon: 'right-align',
    iconRTL: 'right-align',
    name: 'Right Align',
  },
  start: {
    icon: 'left-align',
    iconRTL: 'right-align',
    name: 'Start Align',
  },
};

function dropDownActiveClass(active: boolean) {
  if (active) {
    return 'active dropdown-item-active';
  } else {
    return '';
  }
}

function BlockFormatDropDown({
  editor,
  blockType,
  rootType,
  disabled = false,
}: {
  blockType: keyof typeof blockTypeToBlockName;
  rootType: keyof typeof rootTypeToRootName;
  editor: LexicalEditor;
  disabled?: boolean;
}): JSX.Element {
  return (
    <DropDown
      buttonAriaLabel='Formatting options for text style'
      buttonClassName='toolbar-item block-controls'
      buttonIconClassName={'icon block-type ' + blockType}
      buttonLabel={blockTypeToBlockName[blockType]}
      disabled={disabled}>
      <DropDownItem
        className={'item wide ' + dropDownActiveClass(blockType === 'paragraph')}
        onClick={() => formatParagraph(editor)}>
        <div className='icon-text-container'>
          <i className='icon paragraph' />
          <span className='text'>Normal</span>
        </div>
        <span className='shortcut'>{SHORTCUTS.NORMAL}</span>
      </DropDownItem>
      <DropDownItem
        className={'item wide ' + dropDownActiveClass(blockType === 'h1')}
        onClick={() => formatHeading(editor, blockType, 'h1')}>
        <div className='icon-text-container'>
          <i className='icon h1' />
          <span className='text'>Heading 1</span>
        </div>
        <span className='shortcut'>{SHORTCUTS.HEADING1}</span>
      </DropDownItem>
      <DropDownItem
        className={'item wide ' + dropDownActiveClass(blockType === 'h2')}
        onClick={() => formatHeading(editor, blockType, 'h2')}>
        <div className='icon-text-container'>
          <i className='icon h2' />
          <span className='text'>Heading 2</span>
        </div>
        <span className='shortcut'>{SHORTCUTS.HEADING2}</span>
      </DropDownItem>
      <DropDownItem
        className={'item wide ' + dropDownActiveClass(blockType === 'h3')}
        onClick={() => formatHeading(editor, blockType, 'h3')}>
        <div className='icon-text-container'>
          <i className='icon h3' />
          <span className='text'>Heading 3</span>
        </div>
        <span className='shortcut'>{SHORTCUTS.HEADING3}</span>
      </DropDownItem>
      <DropDownItem
        className={'item wide ' + dropDownActiveClass(blockType === 'bullet')}
        onClick={() => formatBulletList(editor, blockType)}>
        <div className='icon-text-container'>
          <i className='icon bullet-list' />
          <span className='text'>Bullet List</span>
        </div>
        <span className='shortcut'>{SHORTCUTS.BULLET_LIST}</span>
      </DropDownItem>
      <DropDownItem
        className={'item wide ' + dropDownActiveClass(blockType === 'number')}
        onClick={() => formatNumberedList(editor, blockType)}>
        <div className='icon-text-container'>
          <i className='icon numbered-list' />
          <span className='text'>Numbered List</span>
        </div>
        <span className='shortcut'>{SHORTCUTS.NUMBERED_LIST}</span>
      </DropDownItem>
      <DropDownItem
        className={'item wide ' + dropDownActiveClass(blockType === 'check')}
        onClick={() => formatCheckList(editor, blockType)}>
        <div className='icon-text-container'>
          <i className='icon check-list' />
          <span className='text'>Check List</span>
        </div>
        <span className='shortcut'>{SHORTCUTS.CHECK_LIST}</span>
      </DropDownItem>
      <DropDownItem
        className={'item wide ' + dropDownActiveClass(blockType === 'quote')}
        onClick={() => formatQuote(editor, blockType)}>
        <div className='icon-text-container'>
          <i className='icon quote' />
          <span className='text'>Quote</span>
        </div>
        <span className='shortcut'>{SHORTCUTS.QUOTE}</span>
      </DropDownItem>
      <DropDownItem
        className={'item wide ' + dropDownActiveClass(blockType === 'code')}
        onClick={() => formatCode(editor, blockType)}>
        <div className='icon-text-container'>
          <i className='icon code' />
          <span className='text'>Code Block</span>
        </div>
        <span className='shortcut'>{SHORTCUTS.CODE_BLOCK}</span>
      </DropDownItem>
    </DropDown>
  );
}

function Divider(): JSX.Element {
  return <div className='divider' />;
}

function FontDropDown({
  editor,
  value,
  style,
  disabled = false,
}: {
  editor: LexicalEditor;
  value: string;
  style: string;
  disabled?: boolean;
}): JSX.Element {
  const handleClick = useCallback(
    (option: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if (selection !== null) {
          $patchStyleText(selection, {
            [style]: option,
          });
        }
      });
    },
    [editor, style],
  );

  const buttonAriaLabel =
    style === 'font-family' ? 'Formatting options for font family' : 'Formatting options for font size';

  return (
    <DropDown
      buttonAriaLabel={buttonAriaLabel}
      buttonClassName={'toolbar-item ' + style}
      buttonIconClassName={style === 'font-family' ? 'icon block-type font-family' : ''}
      buttonLabel={value}
      disabled={disabled}>
      {(style === 'font-family' ? FONT_FAMILY_OPTIONS : FONT_SIZE_OPTIONS).map(([option, text]) => (
        <DropDownItem
          className={`item ${dropDownActiveClass(value === option)} ${style === 'font-size' ? 'fontsize-item' : ''}`}
          key={option}
          onClick={() => handleClick(option)}>
          <span className='text'>{text}</span>
        </DropDownItem>
      ))}
    </DropDown>
  );
}

function ElementFormatDropdown({
  editor,
  value,
  isRTL,
  disabled = false,
}: {
  editor: LexicalEditor;
  value: ElementFormatType;
  isRTL: boolean;
  disabled: boolean;
}) {
  const formatOption = ELEMENT_FORMAT_OPTIONS[value || 'left'];

  return (
    <DropDown
      buttonAriaLabel='Formatting options for text alignment'
      buttonClassName='toolbar-item spaced alignment'
      buttonIconClassName={`icon ${isRTL ? formatOption.iconRTL : formatOption.icon}`}
      buttonLabel={formatOption.name}
      disabled={disabled}>
      <DropDownItem
        className='item wide'
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        }}>
        <div className='icon-text-container'>
          <i className='icon left-align' />
          <span className='text'>Left Align</span>
        </div>
        <span className='shortcut'>{SHORTCUTS.LEFT_ALIGN}</span>
      </DropDownItem>
      <DropDownItem
        className='item wide'
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        }}>
        <div className='icon-text-container'>
          <i className='icon center-align' />
          <span className='text'>Center Align</span>
        </div>
        <span className='shortcut'>{SHORTCUTS.CENTER_ALIGN}</span>
      </DropDownItem>
      <DropDownItem
        className='item wide'
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        }}>
        <div className='icon-text-container'>
          <i className='icon right-align' />
          <span className='text'>Right Align</span>
        </div>
        <span className='shortcut'>{SHORTCUTS.RIGHT_ALIGN}</span>
      </DropDownItem>
      <DropDownItem
        className='item wide'
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
        }}>
        <div className='icon-text-container'>
          <i className='icon justify-align' />
          <span className='text'>Justify Align</span>
        </div>
        <span className='shortcut'>{SHORTCUTS.JUSTIFY_ALIGN}</span>
      </DropDownItem>
      <DropDownItem
        className='item wide'
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'start');
        }}>
        <i className={`icon ${isRTL ? ELEMENT_FORMAT_OPTIONS.start.iconRTL : ELEMENT_FORMAT_OPTIONS.start.icon}`} />
        <span className='text'>Start Align</span>
      </DropDownItem>
      <DropDownItem
        className='item wide'
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'end');
        }}>
        <i className={`icon ${isRTL ? ELEMENT_FORMAT_OPTIONS.end.iconRTL : ELEMENT_FORMAT_OPTIONS.end.icon}`} />
        <span className='text'>End Align</span>
      </DropDownItem>
      <Divider />
      <DropDownItem
        className='item wide'
        onClick={() => {
          editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
        }}>
        <div className='icon-text-container'>
          <i className={'icon ' + (isRTL ? 'indent' : 'outdent')} />
          <span className='text'>Outdent</span>
        </div>
        <span className='shortcut'>{SHORTCUTS.OUTDENT}</span>
      </DropDownItem>
      <DropDownItem
        className='item wide'
        onClick={() => {
          editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
        }}>
        <div className='icon-text-container'>
          <i className={'icon ' + (isRTL ? 'outdent' : 'indent')} />
          <span className='text'>Indent</span>
        </div>
        <span className='shortcut'>{SHORTCUTS.INDENT}</span>
      </DropDownItem>
    </DropDown>
  );
}

export default function ToolbarPlugin({
  editor,
  activeEditor,
  setActiveEditor,
  setIsLinkEditMode,
}: {
  editor: LexicalEditor;
  activeEditor: LexicalEditor;
  setActiveEditor: Dispatch<LexicalEditor>;
  setIsLinkEditMode: Dispatch<boolean>;
}): JSX.Element {
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(null);
  const [modal, showModal] = useModal();
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());
  const { toolbarState, updateToolbarState } = useToolbarState();

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      if (activeEditor !== editor && $isEditorIsNestedEditor(activeEditor)) {
        const rootElement = activeEditor.getRootElement();
        updateToolbarState(
          'isImageCaption',
          !!rootElement?.parentElement?.classList.contains('image-caption-container'),
        );
      } else {
        updateToolbarState('isImageCaption', false);
      }

      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      updateToolbarState('isRTL', $isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      const isLink = $isLinkNode(parent) || $isLinkNode(node);
      updateToolbarState('isLink', isLink);

      const tableNode = $findMatchingParent(node, $isTableNode);
      if ($isTableNode(tableNode)) {
        updateToolbarState('rootType', 'table');
      } else {
        updateToolbarState('rootType', 'root');
      }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode);
          const type = parentList ? parentList.getListType() : element.getListType();

          updateToolbarState('blockType', type);
        } else {
          const type = $isHeadingNode(element) ? element.getTag() : element.getType();
          if (type in blockTypeToBlockName) {
            updateToolbarState('blockType', type as keyof typeof blockTypeToBlockName);
          }
          if ($isCodeNode(element)) {
            const language = element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
            updateToolbarState('codeLanguage', language ? CODE_LANGUAGE_MAP[language] || language : '');
            return;
          }
        }
      }
      // Handle buttons
      updateToolbarState('fontColor', $getSelectionStyleValueForProperty(selection, 'color', '#000'));
      updateToolbarState('bgColor', $getSelectionStyleValueForProperty(selection, 'background-color', '#fff'));
      updateToolbarState('fontFamily', $getSelectionStyleValueForProperty(selection, 'font-family', 'Arial'));
      let matchingParent;
      if ($isLinkNode(parent)) {
        // If node is a link, we need to fetch the parent paragraph node to set format
        matchingParent = $findMatchingParent(
          node,
          (parentNode) => $isElementNode(parentNode) && !parentNode.isInline(),
        );
      }

      // If matchingParent is a valid node, pass it's format type
      updateToolbarState(
        'elementFormat',
        $isElementNode(matchingParent)
          ? matchingParent.getFormatType()
          : $isElementNode(node)
            ? node.getFormatType()
            : parent?.getFormatType() || 'left',
      );
    }
    if ($isRangeSelection(selection) || $isTableSelection(selection)) {
      // Update text format
      updateToolbarState('isBold', selection.hasFormat('bold'));
      updateToolbarState('isItalic', selection.hasFormat('italic'));
      updateToolbarState('isUnderline', selection.hasFormat('underline'));
      updateToolbarState('isStrikethrough', selection.hasFormat('strikethrough'));
      updateToolbarState('isSubscript', selection.hasFormat('subscript'));
      updateToolbarState('isSuperscript', selection.hasFormat('superscript'));
      updateToolbarState('isHighlight', selection.hasFormat('highlight'));
      updateToolbarState('isCode', selection.hasFormat('code'));
      updateToolbarState('fontSize', $getSelectionStyleValueForProperty(selection, 'font-size', '15px'));
      updateToolbarState('isLowercase', selection.hasFormat('lowercase'));
      updateToolbarState('isUppercase', selection.hasFormat('uppercase'));
      updateToolbarState('isCapitalize', selection.hasFormat('capitalize'));
    }
  }, [activeEditor, editor, updateToolbarState]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        setActiveEditor(newEditor);
        $updateToolbar();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, $updateToolbar, setActiveEditor]);

  useEffect(() => {
    activeEditor.getEditorState().read(() => {
      $updateToolbar();
    });
  }, [activeEditor, $updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable);
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          updateToolbarState('canUndo', payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          updateToolbarState('canRedo', payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    );
  }, [$updateToolbar, activeEditor, editor, updateToolbarState]);

  const applyStyleText = useCallback(
    (styles: Record<string, string>, skipHistoryStack?: boolean) => {
      activeEditor.update(
        () => {
          const selection = $getSelection();
          if (selection !== null) {
            $patchStyleText(selection, styles);
          }
        },
        skipHistoryStack ? { tag: 'historic' } : {},
      );
    },
    [activeEditor],
  );

  const onFontColorSelect = useCallback(
    (value: string, skipHistoryStack: boolean) => {
      applyStyleText({ color: value }, skipHistoryStack);
    },
    [applyStyleText],
  );

  const onBgColorSelect = useCallback(
    (value: string, skipHistoryStack: boolean) => {
      applyStyleText({ 'background-color': value }, skipHistoryStack);
    },
    [applyStyleText],
  );

  const insertLink = useCallback(() => {
    if (!toolbarState.isLink) {
      setIsLinkEditMode(true);
      activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://'));
    } else {
      setIsLinkEditMode(false);
      activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [activeEditor, setIsLinkEditMode, toolbarState.isLink]);

  const onCodeLanguageSelect = useCallback(
    (value: string) => {
      activeEditor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(value);
          }
        }
      });
    },
    [activeEditor, selectedElementKey],
  );
  const insertGifOnClick = (payload: InsertImagePayload) => {
    activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
  };

  const canViewerSeeInsertDropdown = !toolbarState.isImageCaption;
  const canViewerSeeInsertCodeButton = !toolbarState.isImageCaption;

  return (
    <div className='toolbar'>
      <button
        aria-label='Undo'
        className='toolbar-item spaced'
        disabled={!toolbarState.canUndo || !isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        title={IS_APPLE ? 'Undo (⌘Z)' : 'Undo (Ctrl+Z)'}
        type='button'>
        <i className='format undo' />
      </button>
      <button
        aria-label='Redo'
        className='toolbar-item'
        disabled={!toolbarState.canRedo || !isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        title={IS_APPLE ? 'Redo (⇧⌘Z)' : 'Redo (Ctrl+Y)'}
        type='button'>
        <i className='format redo' />
      </button>
      <Divider />
      {toolbarState.blockType in blockTypeToBlockName && activeEditor === editor && (
        <>
          <BlockFormatDropDown
            blockType={toolbarState.blockType}
            disabled={!isEditable}
            editor={activeEditor}
            rootType={toolbarState.rootType}
          />
          <Divider />
        </>
      )}
      {toolbarState.blockType === 'code' ? (
        <DropDown
          buttonAriaLabel='Select language'
          buttonClassName='toolbar-item code-language'
          buttonLabel={getLanguageFriendlyName(toolbarState.codeLanguage)}
          disabled={!isEditable}>
          {CODE_LANGUAGE_OPTIONS.map(([value, name]) => {
            return (
              <DropDownItem
                className={`item ${dropDownActiveClass(value === toolbarState.codeLanguage)}`}
                key={value}
                onClick={() => onCodeLanguageSelect(value)}>
                <span className='text'>{name}</span>
              </DropDownItem>
            );
          })}
        </DropDown>
      ) : (
        <>
          <FontDropDown
            disabled={!isEditable}
            editor={activeEditor}
            style={'font-family'}
            value={toolbarState.fontFamily}
          />
          <Divider />
          <FontSize
            disabled={!isEditable}
            editor={activeEditor}
            selectionFontSize={toolbarState.fontSize.slice(0, -2)}
          />
          <Divider />
          <button
            aria-label={`Format text as bold. Shortcut: ${SHORTCUTS.BOLD}`}
            className={'toolbar-item spaced ' + (toolbarState.isBold ? 'active' : '')}
            disabled={!isEditable}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
            }}
            title={`Bold (${SHORTCUTS.BOLD})`}
            type='button'>
            <i className='format bold' />
          </button>
          <button
            aria-label={`Format text as italics. Shortcut: ${SHORTCUTS.ITALIC}`}
            className={'toolbar-item spaced ' + (toolbarState.isItalic ? 'active' : '')}
            disabled={!isEditable}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
            }}
            title={`Italic (${SHORTCUTS.ITALIC})`}
            type='button'>
            <i className='format italic' />
          </button>
          <button
            aria-label={`Format text to underlined. Shortcut: ${SHORTCUTS.UNDERLINE}`}
            className={'toolbar-item spaced ' + (toolbarState.isUnderline ? 'active' : '')}
            disabled={!isEditable}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
            }}
            title={`Underline (${SHORTCUTS.UNDERLINE})`}
            type='button'>
            <i className='format underline' />
          </button>
          {canViewerSeeInsertCodeButton && (
            <button
              aria-label='Insert code block'
              className={'toolbar-item spaced ' + (toolbarState.isCode ? 'active' : '')}
              disabled={!isEditable}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
              }}
              title={`Insert code block (${SHORTCUTS.INSERT_CODE_BLOCK})`}
              type='button'>
              <i className='format code' />
            </button>
          )}
          <button
            aria-label='Insert link'
            className={'toolbar-item spaced ' + (toolbarState.isLink ? 'active' : '')}
            disabled={!isEditable}
            onClick={insertLink}
            title={`Insert link (${SHORTCUTS.INSERT_LINK})`}
            type='button'>
            <i className='format link' />
          </button>
          <DropdownColorPicker
            buttonAriaLabel='Formatting text color'
            buttonClassName='toolbar-item color-picker'
            buttonIconClassName='icon font-color'
            color={toolbarState.fontColor}
            disabled={!isEditable}
            onChange={onFontColorSelect}
            title='text color'
          />
          <DropdownColorPicker
            buttonAriaLabel='Formatting background color'
            buttonClassName='toolbar-item color-picker'
            buttonIconClassName='icon bg-color'
            color={toolbarState.bgColor}
            disabled={!isEditable}
            onChange={onBgColorSelect}
            title='bg color'
          />
          <DropDown
            buttonAriaLabel='Formatting options for additional text styles'
            buttonClassName='toolbar-item spaced'
            buttonIconClassName='icon dropdown-more'
            buttonLabel=''
            disabled={!isEditable}>
            <DropDownItem
              aria-label='Format text to lowercase'
              className={'item wide ' + dropDownActiveClass(toolbarState.isLowercase)}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'lowercase');
              }}
              title='Lowercase'>
              <div className='icon-text-container'>
                <i className='icon lowercase' />
                <span className='text'>Lowercase</span>
              </div>
              <span className='shortcut'>{SHORTCUTS.LOWERCASE}</span>
            </DropDownItem>
            <DropDownItem
              aria-label='Format text to uppercase'
              className={'item wide ' + dropDownActiveClass(toolbarState.isUppercase)}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'uppercase');
              }}
              title='Uppercase'>
              <div className='icon-text-container'>
                <i className='icon uppercase' />
                <span className='text'>Uppercase</span>
              </div>
              <span className='shortcut'>{SHORTCUTS.UPPERCASE}</span>
            </DropDownItem>
            <DropDownItem
              aria-label='Format text to capitalize'
              className={'item wide ' + dropDownActiveClass(toolbarState.isCapitalize)}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'capitalize');
              }}
              title='Capitalize'>
              <div className='icon-text-container'>
                <i className='icon capitalize' />
                <span className='text'>Capitalize</span>
              </div>
              <span className='shortcut'>{SHORTCUTS.CAPITALIZE}</span>
            </DropDownItem>
            <DropDownItem
              aria-label='Format text with a strikethrough'
              className={'item wide ' + dropDownActiveClass(toolbarState.isStrikethrough)}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
              }}
              title='Strikethrough'>
              <div className='icon-text-container'>
                <i className='icon strikethrough' />
                <span className='text'>Strikethrough</span>
              </div>
              <span className='shortcut'>{SHORTCUTS.STRIKETHROUGH}</span>
            </DropDownItem>
            <DropDownItem
              aria-label='Format text with a subscript'
              className={'item wide ' + dropDownActiveClass(toolbarState.isSubscript)}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'subscript');
              }}
              title='Subscript'>
              <div className='icon-text-container'>
                <i className='icon subscript' />
                <span className='text'>Subscript</span>
              </div>
              <span className='shortcut'>{SHORTCUTS.SUBSCRIPT}</span>
            </DropDownItem>
            <DropDownItem
              aria-label='Format text with a superscript'
              className={'item wide ' + dropDownActiveClass(toolbarState.isSuperscript)}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript');
              }}
              title='Superscript'>
              <div className='icon-text-container'>
                <i className='icon superscript' />
                <span className='text'>Superscript</span>
              </div>
              <span className='shortcut'>{SHORTCUTS.SUPERSCRIPT}</span>
            </DropDownItem>
            <DropDownItem
              aria-label='Format text with a highlight'
              className={'item wide ' + dropDownActiveClass(toolbarState.isHighlight)}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, 'highlight');
              }}
              title='Highlight'>
              <div className='icon-text-container'>
                <i className='icon highlight' />
                <span className='text'>Highlight</span>
              </div>
            </DropDownItem>
            <DropDownItem
              aria-label='Clear all text formatting'
              className='item wide'
              onClick={() => clearFormatting(activeEditor)}
              title='Clear text formatting'>
              <div className='icon-text-container'>
                <i className='icon clear' />
                <span className='text'>Clear Formatting</span>
              </div>
              <span className='shortcut'>{SHORTCUTS.CLEAR_FORMATTING}</span>
            </DropDownItem>
          </DropDown>
          {canViewerSeeInsertDropdown && (
            <>
              <Divider />
              <DropDown
                buttonAriaLabel='Insert specialized editor node'
                buttonClassName='toolbar-item spaced'
                buttonIconClassName='icon plus'
                buttonLabel='Insert'
                disabled={!isEditable}>
                <DropDownItem
                  className='item'
                  onClick={() => {
                    activeEditor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
                  }}>
                  <i className='icon horizontal-rule' />
                  <span className='text'>Horizontal Rule</span>
                </DropDownItem>
                <DropDownItem
                  className='item'
                  onClick={() => {
                    activeEditor.dispatchCommand(INSERT_PAGE_BREAK, undefined);
                  }}>
                  <i className='icon page-break' />
                  <span className='text'>Page Break</span>
                </DropDownItem>
                <DropDownItem
                  className='item'
                  onClick={() => {
                    showModal('Insert Image', (onClose) => (
                      <InsertImageDialog activeEditor={activeEditor} onClose={onClose} />
                    ));
                  }}>
                  <i className='icon image' />
                  <span className='text'>Image</span>
                </DropDownItem>
                <DropDownItem
                  className='item'
                  onClick={() => {
                    showModal('Insert Inline Image', (onClose) => (
                      <InsertInlineImageDialog activeEditor={activeEditor} onClose={onClose} />
                    ));
                  }}>
                  <i className='icon image' />
                  <span className='text'>Inline Image</span>
                </DropDownItem>
                <DropDownItem
                  className='item'
                  onClick={() =>
                    insertGifOnClick({
                      altText: 'Cat typing on a laptop',
                      src: catTypingGif as unknown as string,
                    })
                  }>
                  <i className='icon gif' />
                  <span className='text'>GIF</span>
                </DropDownItem>
                <DropDownItem
                  className='item'
                  onClick={() => {
                    activeEditor.dispatchCommand(INSERT_EXCALIDRAW_COMMAND, undefined);
                  }}>
                  <i className='icon diagram-2' />
                  <span className='text'>Excalidraw</span>
                </DropDownItem>
                <DropDownItem
                  className='item'
                  onClick={() => {
                    showModal('Insert Table', (onClose) => (
                      <InsertTableDialog activeEditor={activeEditor} onClose={onClose} />
                    ));
                  }}>
                  <i className='icon table' />
                  <span className='text'>Table</span>
                </DropDownItem>
                <DropDownItem
                  className='item'
                  onClick={() => {
                    showModal('Insert Poll', (onClose) => (
                      <InsertPollDialog activeEditor={activeEditor} onClose={onClose} />
                    ));
                  }}>
                  <i className='icon poll' />
                  <span className='text'>Poll</span>
                </DropDownItem>
                <DropDownItem
                  className='item'
                  onClick={() => {
                    showModal('Insert Columns Layout', (onClose) => (
                      <InsertLayoutDialog activeEditor={activeEditor} onClose={onClose} />
                    ));
                  }}>
                  <i className='icon columns' />
                  <span className='text'>Columns Layout</span>
                </DropDownItem>

                <DropDownItem
                  className='item'
                  onClick={() => {
                    showModal('Insert Equation', (onClose) => (
                      <InsertEquationDialog activeEditor={activeEditor} onClose={onClose} />
                    ));
                  }}>
                  <i className='icon equation' />
                  <span className='text'>Equation</span>
                </DropDownItem>
                <DropDownItem
                  className='item'
                  onClick={() => {
                    editor.update(() => {
                      const root = $getRoot();
                      const stickyNode = $createStickyNode(0, 0);
                      root.append(stickyNode);
                    });
                  }}>
                  <i className='icon sticky' />
                  <span className='text'>Sticky Note</span>
                </DropDownItem>
                <DropDownItem
                  className='item'
                  onClick={() => {
                    editor.dispatchCommand(INSERT_COLLAPSIBLE_COMMAND, undefined);
                  }}>
                  <i className='icon caret-right' />
                  <span className='text'>Collapsible container</span>
                </DropDownItem>
                {EmbedConfigs.map((embedConfig) => (
                  <DropDownItem
                    className='item'
                    key={embedConfig.type}
                    onClick={() => {
                      activeEditor.dispatchCommand(INSERT_EMBED_COMMAND, embedConfig.type);
                    }}>
                    {embedConfig.icon}
                    <span className='text'>{embedConfig.contentName}</span>
                  </DropDownItem>
                ))}
              </DropDown>
            </>
          )}
        </>
      )}
      <Divider />
      <ElementFormatDropdown
        disabled={!isEditable}
        editor={activeEditor}
        isRTL={toolbarState.isRTL}
        value={toolbarState.elementFormat}
      />

      {modal}
    </div>
  );
}
