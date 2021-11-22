import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/Button';
import './styles/index.scss'
import MenuItem from './components/Menu/menuItem';
import Menu from './components/Menu/menu';

function App() {
  return (
    <div className="App">
      <Menu defaultIndex={0}>
        <MenuItem index={0}>
          cool Link
        </MenuItem>
        <MenuItem index={1}>
          cool Link1
        </MenuItem>
        <MenuItem index={2}>
          cool Link1
        </MenuItem>
      </Menu>
      <header className="App-header">
        <Button autoFocus>Hello</Button>
        <Button disabled>Hello</Button>
        <Button onClick={()=>{console.log('12212')}} btnType={ButtonType.Primary} size={ButtonSize.Small}>Hello</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>Hello</Button>
        <Button btnType={ButtonType.Link} href='www.baiudu,com'>Hello</Button>
      </header>
    </div>
  );
}

export default App;
