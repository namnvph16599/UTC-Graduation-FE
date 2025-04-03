/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { JSX } from 'react';

import * as React from 'react';

export default function DocsPlugin(): JSX.Element {
  return (
    <a href='https://lexical.dev/docs/intro' target='__blank'>
      <button className='editor-dev-button' id='docs-button' title='Lexical Docs' />
    </a>
  );
}
