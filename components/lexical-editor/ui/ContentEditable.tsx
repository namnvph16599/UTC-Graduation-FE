/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { JSX } from 'react';

import './ContentEditable.css';

// eslint-disable-next-line import/order
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import * as React from 'react';

type Props = {
  className?: string;
  placeholderClassName?: string;
  placeholder: string;
};

export default function LexicalContentEditable({ className, placeholder, placeholderClassName }: Props): JSX.Element {
  return (
    <ContentEditable
      aria-placeholder={placeholder}
      className={className ?? 'ContentEditable__root'}
      placeholder={<div className={placeholderClassName ?? 'ContentEditable__placeholder'}>{placeholder}</div>}
    />
  );
}
