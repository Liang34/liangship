import React from "react";
import classNames from "classnames";
export interface MenuItemProps {
  index?: string;// 确定那一项高亮，与defaultIndex比较
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    // 'is-active': context.index === index
  })
  return (
    <li className={classes} style={style}>
      {children}
    </li>
  )
}
export default MenuItem;
