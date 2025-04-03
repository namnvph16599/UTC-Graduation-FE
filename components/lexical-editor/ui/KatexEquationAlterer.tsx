/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { JSX } from 'react';

import './KatexEquationAlterer.css';

// eslint-disable-next-line import/order
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import KatexRenderer from './KatexRenderer';
import Button from '../ui/Button';

type Props = {
  initialEquation?: string;
  onConfirm: (equation: string, inline: boolean) => void;
};

export default function KatexEquationAlterer({ onConfirm, initialEquation = '' }: Props): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [equation, setEquation] = useState<string>(initialEquation);
  const [inline, setInline] = useState<boolean>(true);

  const onClick = useCallback(() => {
    onConfirm(equation, inline);
  }, [onConfirm, equation, inline]);

  const onCheckboxChange = useCallback(() => {
    setInline(!inline);
  }, [setInline, inline]);

  return (
    <>
      <div className='KatexEquationAlterer_defaultRow'>
        Inline
        <input checked={inline} onChange={onCheckboxChange} type='checkbox' />
      </div>
      <div className='KatexEquationAlterer_defaultRow'>Equation </div>
      <div className='KatexEquationAlterer_centerRow'>
        {inline ? (
          <input
            className='KatexEquationAlterer_textArea'
            onChange={(event) => {
              setEquation(event.target.value);
            }}
            value={equation}
          />
        ) : (
          <textarea
            className='KatexEquationAlterer_textArea'
            onChange={(event) => {
              setEquation(event.target.value);
            }}
            value={equation}
          />
        )}
      </div>
      <div className='KatexEquationAlterer_defaultRow'>Visualization </div>
      <div className='KatexEquationAlterer_centerRow'>
        <ErrorBoundary fallback={null} onError={(e) => editor._onError(e)}>
          <KatexRenderer equation={equation} inline={false} onDoubleClick={() => null} />
        </ErrorBoundary>
      </div>
      <div className='KatexEquationAlterer_dialogActions'>
        <Button onClick={onClick}>Confirm</Button>
      </div>
    </>
  );
}
