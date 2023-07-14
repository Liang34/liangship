import React, { ReactNode, CSSProperties, useCallback, useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

import './index.scss';

export interface affixProps extends React.HTMLAttributes<HTMLDivElement> {
    offsetTop?: number;
    className?: string;
    children?: ReactNode;
    style?: CSSProperties;
}

const Affix = (props: affixProps) => {
    const { className, children, style, offsetTop=0, ...others } = props;
    const [wraperStyle ={}, setWrapperStyle] = useState(null);
    const [affixed, setAffixed] = useState(false);

    const wraperRef = useRef(null);
    const fixedRef = useRef(null);

    function updatePosition() {
        // @ts-ignore
        const { top, width, height } = wraperRef.current?.getBoundingClientRect();
        if (top <= offsetTop && !affixed) {
            setWrapperStyle({
                // @ts-ignore
                width,
                height
            });
            setAffixed(true);
        } else if (top > offsetTop) {
            setAffixed(false);
            // @ts-ignore
            fixedRef.current.setAttribute('style', null);
        }
    }

    useEffect(() => {
        const wraperNode = wraperRef.current;
        if (!wraperNode) {
            return;
        }

        window.addEventListener('scroll', updatePosition, false)
        return () => {
            window.removeEventListener('scroll', updatePosition, false)
        }
    }, [])

    const cls = classNames({
        'bobo-affix': affixed,
        [className as string]: !!className
    })
    return <div ref={wraperRef}>
        {affixed ? <div style={wraperStyle!} /> : null}
        <div style={affixed ? {
            top: offsetTop,
            ...wraperStyle
        } : undefined} ref={fixedRef} className={cls}>
            {children}
        </div>
    </div>;
}

export default Affix;