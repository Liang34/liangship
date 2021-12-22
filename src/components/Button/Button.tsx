import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import classNames from 'classnames'
// 常量可以用枚举保存
export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'
// props
interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}
// 获取按钮的属性
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
// 获取a标签的属性并返回
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
// Partial(属性可选)
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
const Button : React.FC<ButtonProps> = (props) => {
  const {
    btnType,
    disabled,
    size,
    children,
    href,
    className,
    ...restProps
  } = props
  // btn， btn-lg , btn-primary
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    // 注意，如果是link的话没有disable属性，需要手动添加该类
    'disabled': (btnType === 'link') && disabled
  })
  // 如果是一个链接形式
  if(btnType === 'link' && href) {
    return (
      <a
        className = {classes}
        href={href}
        {...restProps}
      >
        {children}
      </a>
    )
  } else {
    return (
    <button
      className={classes}
      disabled={disabled}
      {...restProps}
    >{children}
    </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}
export default Button