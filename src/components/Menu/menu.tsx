import React, { CSSProperties, createContext, useState } from "react"
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'
type MenuMode = 'horizontal' | 'vertical' // String Literal Types比枚举更好用一点
type SelectCallBack = (selectedIndex: string) => void
export interface MenuProps {
  defaultIndex?: string; /**默认 active 的菜单项的索引值 */
  className?: string;
  mode?: MenuMode; /**菜单类型 横向或者纵向 */
  style?: CSSProperties;
  onSelect?: SelectCallBack;/**点击菜单项触发的回掉函数 */
  defaultOpenSubMenus?: string[]; /**设置子菜单的默认打开 只在纵向模式下生效 */
}
interface IMenuContext {
  index: string;
  onSelect?: SelectCallBack;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}
export const MenuContext = createContext<IMenuContext>({index: '0'})
export const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props
  const [ currentActive, setActive ] = useState(defaultIndex)
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })
  // 两件事一：改变高亮，二、用户需要执行的回调
  const handleClick = (index: string) => {
    setActive(index)
    if(onSelect) {
      onSelect(index);
    }
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }
  const renderChildren = () => {
    // 父组件操控children，直接用children.map可能会导致许多问题，因为children的数据结构是不确定的，
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // 把index混进去
        return React.cloneElement(childElement, {
          index: index.toString()
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
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}
export default Menu;
