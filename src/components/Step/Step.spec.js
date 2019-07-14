/**
 * Copyright 2019, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';

import Step from './Step';
import useStateAndHandlers from './use-state-and-helpers';

jest.mock('./use-state-and-helpers', () => jest.fn(() => ({})));

describe('Step', () => {
  afterAll(() => {
    jest.resetModules();
  });

  it('should not render without children as a function', () => {
    const actual = create(<Step />);

    expect(actual).toMatchSnapshot();
  });

  it('should pass state and helpers to children', () => {
    const data = { step: 1, previousStep: 0 };
    const children = jest.fn(() => <div />);

    useStateAndHandlers.mockReturnValue(data);

    render(<Step>{children}</Step>);

    expect(children).toHaveBeenCalledTimes(1);
    expect(children).toHaveBeenCalledWith(data);
  });
});
