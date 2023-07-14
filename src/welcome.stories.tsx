import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome', module)
  .add('welcome', () => {
    return (
      <>
        <h1>欢迎来到 liangShip 组件库</h1>
        <p>所用技术：React、React Hooks、sass、typescript等开发</p>
        <p>目前已经有17个组件, 已发布到npm上</p>
        <h3>尝试安装</h3>
        <code>
          npm install liangShip --save
        </code>
      </>
    )
  }, { info : { disable: true }})
  // import { Meta } from '@storybook/addon-docs/blocks'

  // <Meta title="Example/Introduction" />
  
  // # Welcome to Storybook
  
  // Storybook helps you build UI components in isolation from your app's business logic, data, and context.
  // That makes it easy to develop hard-to-reach states. Save these UI states as **stories** to revisit during development, testing, or QA.
  
  // Browse example stories now by navigating to them in the sidebar.
  // View their code in the `src/storybook-examples` directory to learn how they work.
  // We recommend building UIs with a [**component-driven**](https://componentdriven.org) process starting with atomic components and ending with pages.
  
  // <h1>欢迎来到 liangShip 组件库</h1>
  // <h3>该组件库已经发布到npm上，安装试试</h3>
  // <code>npm install liangship --save</code>
  // <p>仓库地址：</p>https://github.com/Liang34/liangship
  // <p>所用技术：React、React Hooks、sass、typescript等开发</p>