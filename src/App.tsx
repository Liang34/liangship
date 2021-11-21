import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/Button';
import './styles/index.scss'
function App() {
  return (
    <div className="App">
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
