import React, { CSSProperties, createContext, useState } from "react"
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'
type MenuMode = 'horizontal' | 'vertical' // String Literal Types
type SelectCallBack = (selectedIndex: number) => void
export interface MenuProps {
  defaultIndex?: number; /**默认 active 的菜单项的索引值 */
  className?: string;
  mode?: MenuMode; /**菜单类型 横向或者纵向 */
  style?: CSSProperties;
  onSelect?: SelectCallBack;/**点击菜单项触发的回掉函数 */
  defaultOpenSubMenus?: string[]; /**设置子菜单的默认打开 只在纵向模式下生效 */
}
interface IMenuContext {
  index: number;
  onSelect?: SelectCallBack;
  mode?: MenuMode;
  style?: CSSProperties;
}
export const MenuContext = createContext<IMenuContext>({index: 0})
export const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props
  const [ currentActive, setActive ] = useState(defaultIndex)
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical'
  })
  const handleClick = (index: number) => {
    setActive(index)
    if(onSelect) {
      onSelect(index);
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index
        })
      } else {
        console.error('Warning: Menu has a Child which is not a MenuItem component')
      }
    })
  }
  return (
    <ul className={classes} style={style} data-testid='test-menu'>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}
export default Menu;
