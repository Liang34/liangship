import React from 'react'
import { storiesOf } from '@storybook/react'
import RecordInput from './recordInput'

const defaultRecordInput = () => (
  <RecordInput />
)


storiesOf('example/RecordInput', module)
  .add('default', defaultRecordInput)
