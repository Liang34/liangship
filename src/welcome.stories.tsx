import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome', module)
  .add('welcome', () => {
    return (
      <>
        <h1>欢迎来到 liangShip 组件库</h1>
        <p>一套教学组件库，使用 React Hooks 和 typescript</p>
        <p>意在让大家从零到一，由浅入深的提高自己的 React 和 typescript 水平</p>
        <h3>安装试试</h3>
        <code>
          npm install liangShip --save
        </code>
      </>
    )
  }, { info : { disable: true }})