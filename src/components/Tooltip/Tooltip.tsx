import React, { ReactElement, CSSProperties, useState } from 'react';
import classNames from 'classnames';
import { Popup } from '../overlay/index';
import { PlacementType } from '../overlay/placement';

import './index.scss';



export interface tooltipProps {
    className?: string;
    type?: 'normal' | 'primary' | 'dashed' | 'link' | 'text';
    size?: 'small' | 'medium' | 'large';
    title?: ReactElement | string;
    children?: ReactElement;
    style?: CSSProperties;
    placement?: PlacementType;
    arrowPointAtCenter?: boolean;
}

const Tooltip = (props: tooltipProps) => {
    const {
        className,
        title,
        children,
        style,
        placement = 'top',
        arrowPointAtCenter = false,
        ...others
    } = props;

    const [realPlacement, setPlacement] = useState(placement);

    const cls = classNames({
        'bobo-tooltip': true,
        [`bobo-tooltip-placement-${realPlacement}`]: realPlacement,
        [className as string]: !!className
    });

    const overlayContent = (<div className={cls}>
        <div className="bobo-tooltip-content">
            <div className="bobo-tooltip-arrow">
                <span className="bobo-tooltip-arrow-content"></span>
            </div>
            <div className="bobo-tooltip-inner">
                {title}
            </div>
        </div>
    </div>);
    // @ts-ignore
    const handleBeforePosition = (position, {target, placement}) => {
        setPlacement(placement);

        if (!arrowPointAtCenter) {
            return position;
        }

        return {
            ...position,
            left: position.left + target.width / 2 - 24,
        }
    }

    return <Popup
        {...others}
        style={style}
        // @ts-ignore
        trigger={children}
        triggerType="hover"
        placement={placement}
        beforePosition={handleBeforePosition}
    >
        {overlayContent}
    </Popup>;
}

export default Tooltip;