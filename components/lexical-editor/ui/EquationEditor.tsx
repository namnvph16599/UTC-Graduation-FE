/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { JSX, Ref, RefObject } from 'react';

import './EquationEditor.css';

// eslint-disable-next-line import/order
import { isHTMLElement } from 'lexical';
import { ChangeEvent, forwardRef } from 'react';

type BaseEquationEditorProps = {
  equation: string;
  inline: boolean;
  setEquation: (equation: string) => void;
};

function EquationEditor(
  { equation, setEquation, inline }: BaseEquationEditorProps,
  forwardedRef: Ref<HTMLInputElement | HTMLTextAreaElement>,
): JSX.Element {
  const onChange = (event: ChangeEvent) => {
    setEquation((event.target as HTMLInputElement).value);
  };

  return inline && isHTMLElement(forwardedRef) ? (
    <span className='EquationEditor_inputBackground'>
      <span className='EquationEditor_dollarSign'>$</span>
      <input
        autoFocus={true}
        className='EquationEditor_inlineEditor'
        onChange={onChange}
        ref={forwardedRef as RefObject<HTMLInputElement>}
        value={equation}
      />
      <span className='EquationEditor_dollarSign'>$</span>
    </span>
  ) : (
    <div className='EquationEditor_inputBackground'>
      <span className='EquationEditor_dollarSign'>{'$$\n'}</span>
      <textarea
        className='EquationEditor_blockEditor'
        onChange={onChange}
        ref={forwardedRef as RefObject<HTMLTextAreaElement>}
        value={equation}
      />
      <span className='EquationEditor_dollarSign'>{'\n$$'}</span>
    </div>
  );
}

export default forwardRef(EquationEditor);
