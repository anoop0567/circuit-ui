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

import { isFunction } from 'lodash/fp';

export function calculateNextStep(data = {}) {
  const { step, stepInterval = 1, firstStep = 0, totalSteps, cycle } = data;
  const lastStep = totalSteps - 1;
  const nextStep = (step || firstStep) + stepInterval;
  const isOutOfRange = nextStep > lastStep;

  if (totalSteps) {
    if (cycle && isOutOfRange) {
      return firstStep;
    }

    if (isOutOfRange) {
      return lastStep;
    }
  }

  return nextStep;
}

export function calculatePreviousStep(data = {}) {
  const { step, stepInterval = 1, firstStep = 0, totalSteps, cycle } = data;
  const previousStep = (step || firstStep) - stepInterval;
  const lastStep = totalSteps - 1;
  const isOutOfRange = previousStep < firstStep;

  if (totalSteps && cycle && isOutOfRange) {
    return lastStep;
  }

  if (isOutOfRange) {
    return firstStep;
  }

  return previousStep;
}

export function callAll(...fns) {
  return (...args) => fns.forEach(fn => isFunction(fn) && fn(...args));
}

export function generatePropGetters(actions = {}) {
  const getStepProps = (props = {}) => ({
    ...props
  });
  const getPlayControlProps = (props = {}) => ({
    'aria-label': 'play',
    ...props,
    onClick: callAll(props.onClick, actions.play)
  });
  const getPauseControlProps = (props = {}) => ({
    'aria-label': 'pause',
    ...props,
    onClick: callAll(props.onClick, actions.pause)
  });
  const getNextControlProps = (props = {}) => ({
    'aria-label': 'next',
    ...props,
    onClick: callAll(props.onClick, actions.next)
  });
  const getPreviousControlProps = (props = {}) => ({
    'aria-label': 'previous',
    ...props,
    onClick: callAll(props.onClick, actions.previous)
  });

  return {
    getStepProps,
    getPlayControlProps,
    getPauseControlProps,
    getNextControlProps,
    getPreviousControlProps
  };
}
