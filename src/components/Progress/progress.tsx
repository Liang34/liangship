import React, { FC } from 'react'
import { ThemeProps } from '../Icon/icon'

export interface ProgressProps {
  /** 当前百分比 */
  percent: number;
  /** 高度 */
  strokeHeight?: number;
  /** 是否显示百分比数字 */
  showText?: boolean;
  /** 额外的样式 */
  styles?: React.CSSProperties;
  /** 主题 */
  theme?: ThemeProps;
  /**直线还是圆形 */
  type?: 'circle' | 'line'
}

const Progress: FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight,
    showText,
    styles,
    theme,
    type="line"
  } = props
  if (type === 'circle') {
    const processColor = '#ff4d4f';
    let left = -135;
    let right = -135;
    if (percent < 50) {
      right = (percent / 100) * 360 + right;
      left = -135;
    } else {
      right = 45;
      left = ((percent - 50) / 100) * 360 + left;
    }

    return <div style={{
      width: 200,
      height: 200,
      border: '20px solid #f5f5f5',
      borderRadius: 100,
      position: 'relative'
    }}>
      <div className="left wrapper" style={{
        width: 100,
        height: 200,
        overflow: 'hidden',
        position: 'absolute',
        left: -20,
        top: -20,
      }}>
        <div style={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          border: '20px solid transparent',
          borderLeftColor: processColor,
          borderBottomColor: processColor,
          position: 'absolute',
          left: 0,
          transform: `rotate(${left}deg)`,
          transition: 'transform 0.3s ease-in-out'
        }} />
      </div>
      <div className="right wrapper" style={{
        width: 100,
        height: 200,
        overflow: 'hidden',
        position: 'absolute',
        right: -20,
        top: -20
      }}>
        <div style={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          border: '20px solid transparent',
          borderTopColor: processColor,
          borderRightColor: processColor,
          position: 'absolute',
          transform: `rotate(${right}deg)`,
          right: 0,
          transition: 'transform 0.3s ease-in-out'
        }} />
      </div>
    </div>
  }
  return (
    <div className="liang-progress-bar" style={styles}>
      <div className="liang-progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
        <div
          className={`liang-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary"
}

export default Progress
