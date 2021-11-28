import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/Button';
import './styles/index.scss'
import MenuItem from './components/Menu/menuItem';
import Menu from './components/Menu/menu';
import SubMenu from './components/Menu/subMenu';
import { library } from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons'
import Icon from './components/Icon/icon';
library.add(fas)
function App() {
  return (
    <div className="App">
      <Icon icon='arrow-down'/>
      <Menu defaultIndex='0' onSelect={(index) => {alert(index)}} mode='horizontal' defaultOpenSubMenus={['2']}>
        <MenuItem >
          cool Link
        </MenuItem>
        <MenuItem>
          cool Link1
        </MenuItem>
        <SubMenu title='dropdown'>
          <MenuItem>
            dropdown1
          </MenuItem>
          <MenuItem>
            dropdown2
          </MenuItem>
        </SubMenu>
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
