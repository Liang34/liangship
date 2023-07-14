/**
 * 弹窗基础组件
 */
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { CSSProperties, ReactElement } from 'react';
import ReactDOM from 'react-dom';

import { useListener } from '../../hooks/useListener';
import getPlacement from './placement';
import { PointsType, PlacementType } from './placement';



export interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactElement;
  hasMask?: boolean;// 阴影
  visible?: boolean;// 显示隐藏
  onVisibleChange?: Function;
  style?: CSSProperties;
  target?: HTMLElement | (() => HTMLElement);
  points?: PointsType;
  placement?: PlacementType;// 弹出方位
  beforePosition?: Function;
}

const Overlay = (props: OverlayProps) => {
  const {
    className,
    children,
    style,
    hasMask,
    visible: pvisible,
    onVisibleChange,
    target,
    points,
    placement,
    beforePosition,
    ...others } = props;

  const [visible, setVisible] = useState(pvisible || false);
  const [positionStyle, setPositionStyle] = useState({});
  const overlayRef = useRef(null);

  useEffect(() => {
    if ('visible' in props) {
      setVisible(!!pvisible);
    }
  }, [pvisible]);

  const handleMouseDown = (e: any) => {
    const safeNodeList: any[] = [];
    // 弹窗默认为安全节点
    if (overlayRef.current) {
      safeNodeList.push(overlayRef.current);
    }

    const clickNode = e.target;
    for (let index = 0; index < safeNodeList.length; index++) {
      const node = safeNodeList[index];
      if (node && node.contains(clickNode)) {
        return;
      }
    }

    onVisibleChange?.(false);
  }

  useListener(window, 'mousedown', handleMouseDown, visible);

  const handleKeyDown = (e: any) => {
    if (!visible || !overlayRef.current) {
      return;
    }
    // 点击esc
    if (e.keyCode === 27) {
      onVisibleChange?.(false);
    }
  }

  useListener(window, 'keydown', handleKeyDown, visible);


  // 弹窗挂载，第一次 mount node=真实dom，卸载的时候 node=null
  const overlayRefCallback = useCallback(node => {
    overlayRef.current = node;
    // 计算位置
    if (node && target) {
      const targetElement = typeof target === 'function' ? target() : target;
      console.log(targetElement.getBoundingClientRect())
      const positionStyle = getPlacement({
        target: targetElement, 
        overlay: node, 
        points,
        placement,
        beforePosition
      });
      setPositionStyle(positionStyle);
    }

  }, []);

  const child: ReactElement | undefined = React.Children.only(children);

  const newChildren = React.cloneElement(child!!, {
    ...others,
    ref: overlayRefCallback,
    style: { ...positionStyle, ...child?.props?.style, zIndex: 1000 }
  });

  if (!visible) {
    return null;
  }

  // 将组件挂到body上
  return ReactDOM.createPortal(<div >
    {hasMask ? <div /> : null}
    {newChildren}
  </div>, document.body);
}

export default Overlay;