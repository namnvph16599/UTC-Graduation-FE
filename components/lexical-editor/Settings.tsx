/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { CAN_USE_BEFORE_INPUT } from '@lexical/utils';
import type { JSX } from 'react';

import { useEffect, useMemo, useState } from 'react';

import { INITIAL_SETTINGS, isDevPlayground } from './appSettings';
import { useSettings } from './context/SettingsContext';
import Switch from './ui/Switch';

export default function Settings(): JSX.Element {
  const windowLocation = window.location;
  const {
    setOption,
    settings: {
      measureTypingPerf,
      isCollab,
      isRichText,
      isMaxLength,
      hasLinkAttributes,
      isCharLimit,
      isCharLimitUtf8,
      isAutocomplete,
      showTreeView,
      showNestedEditorTreeView,
      // disableBeforeInput,
      showTableOfContents,
      shouldUseLexicalContextMenu,
      shouldPreserveNewLinesInMarkdown,
      shouldAllowHighlightingWithBrackets,
      // tableHorizontalScroll,
      selectionAlwaysOnDisplay,
    },
  } = useSettings();
  useEffect(() => {
    if (INITIAL_SETTINGS.disableBeforeInput && CAN_USE_BEFORE_INPUT) {
      console.error(`Legacy events are enabled (disableBeforeInput) but CAN_USE_BEFORE_INPUT is true`);
    }
  }, []);
  const [showSettings, setShowSettings] = useState(false);
  const [isSplitScreen, search] = useMemo(() => {
    const parentWindow = window.parent;
    const _search = windowLocation.search;
    const _isSplitScreen = parentWindow && parentWindow.location.pathname === '/split/';
    return [_isSplitScreen, _search];
  }, [windowLocation]);

  return (
    <>
      <button
        className={`editor-dev-button ${showSettings ? 'active' : ''}`}
        id='options-button'
        onClick={() => setShowSettings(!showSettings)}
      />
      {showSettings ? (
        <div className='switches'>
          {isRichText && isDevPlayground && (
            <Switch
              checked={isCollab}
              onClick={() => {
                setOption('isCollab', !isCollab);
                window.location.reload();
              }}
              text='Collaboration'
            />
          )}
          {isDevPlayground && (
            <Switch
              checked={isSplitScreen}
              onClick={() => {
                if (isSplitScreen) {
                  window.parent.location.href = `/${search}`;
                } else {
                  window.location.href = `/split/${search}`;
                }
              }}
              text='Split Screen'
            />
          )}
          <Switch
            checked={measureTypingPerf}
            onClick={() => setOption('measureTypingPerf', !measureTypingPerf)}
            text='Measure Perf'
          />
          <Switch checked={showTreeView} onClick={() => setOption('showTreeView', !showTreeView)} text='Debug View' />
          <Switch
            checked={showNestedEditorTreeView}
            onClick={() => setOption('showNestedEditorTreeView', !showNestedEditorTreeView)}
            text='Nested Editors Debug View'
          />
          <Switch
            checked={isRichText}
            onClick={() => {
              setOption('isRichText', !isRichText);
              setOption('isCollab', false);
            }}
            text='Rich Text'
          />
          <Switch checked={isCharLimit} onClick={() => setOption('isCharLimit', !isCharLimit)} text='Char Limit' />
          <Switch
            checked={isCharLimitUtf8}
            onClick={() => setOption('isCharLimitUtf8', !isCharLimitUtf8)}
            text='Char Limit (UTF-8)'
          />
          <Switch
            checked={hasLinkAttributes}
            onClick={() => setOption('hasLinkAttributes', !hasLinkAttributes)}
            text='Link Attributes'
          />
          <Switch checked={isMaxLength} onClick={() => setOption('isMaxLength', !isMaxLength)} text='Max Length' />
          <Switch
            checked={isAutocomplete}
            onClick={() => setOption('isAutocomplete', !isAutocomplete)}
            text='Autocomplete'
          />
          {/* <Switch
            onClick={() => {
              setOption('disableBeforeInput', !disableBeforeInput);
              setTimeout(() => window.location.reload(), 500);
            }}
            checked={disableBeforeInput}
            text="Legacy Events"
          /> */}
          <Switch
            checked={showTableOfContents}
            onClick={() => {
              setOption('showTableOfContents', !showTableOfContents);
            }}
            text='Table Of Contents'
          />
          <Switch
            checked={shouldUseLexicalContextMenu}
            onClick={() => {
              setOption('shouldUseLexicalContextMenu', !shouldUseLexicalContextMenu);
            }}
            text='Use Lexical Context Menu'
          />
          <Switch
            checked={shouldPreserveNewLinesInMarkdown}
            onClick={() => {
              setOption('shouldPreserveNewLinesInMarkdown', !shouldPreserveNewLinesInMarkdown);
            }}
            text='Preserve newlines in Markdown'
          />
          {/* <Switch
            onClick={() => {
              setOption('tableHorizontalScroll', !tableHorizontalScroll);
            }}
            checked={tableHorizontalScroll}
            text="Tables have horizontal scroll"
          /> */}
          <Switch
            checked={shouldAllowHighlightingWithBrackets}
            onClick={() => {
              setOption('shouldAllowHighlightingWithBrackets', !shouldAllowHighlightingWithBrackets);
            }}
            text='Use Brackets for Highlighting'
          />

          <Switch
            checked={selectionAlwaysOnDisplay}
            onClick={() => {
              setOption('selectionAlwaysOnDisplay', !selectionAlwaysOnDisplay);
            }}
            text='Retain selection'
          />
        </div>
      ) : null}
    </>
  );
}
