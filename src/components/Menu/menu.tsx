import React, { CSSProperties } from "react"
import classNames from 'classnames'

type MenuMode = 'horizontal' | 'vertical' // String Literal Types
export interface MenuProps {
  defaultIndex?: number; /**默认 active 的菜单项的索引值 */
  className?: string;
  mode?: MenuMode; /**菜单类型 横向或者纵向 */
  style?: CSSProperties;
  onSelect?: (selectedIndex: string) => void;/**点击菜单项触发的回掉函数 */
  defaultOpenSubMenus?: string[]; /**设置子菜单的默认打开 只在纵向模式下生效 */
}
interface IMenuContext {
  index: string;
  onSelect?: (selectedIndex: string) => void;
  mode?: MenuMode;
  style?: CSSProperties;
}
export const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical'
  })
  return (
    <ul className={classes} style={style}>
      {children}
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}
export default Menu;
