import React, { ReactNode, CSSProperties, useState, useRef } from 'react';
import classNames from 'classnames';

import './index.scss';

export interface radioProps extends React.HTMLAttributes<HTMLInputElement> {
    value?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
    /**
     * 禁用
     */
    disabled?: boolean;
    className?: string;
    children?: ReactNode;
    style?: CSSProperties;
}

const Radio = (props: radioProps) => {
    const {disabled, className, children, style, onChange, value, ...others} = props;

    const [checked, setChecked] = useState(false);
    const inputEl = useRef(null);

    const cls = classNames({
        'liang-radio': true,
        'liang-radio-checked': checked,
        'liang-radio-disabled': disabled,
    });

    const wrapperCls = classNames({
        'liang-radio-wrapper': true,
        'liang-radio-wrapper-disabled': disabled,
    });

    React.useEffect(() => {
        // props参数改变更正props
        if (props.checked && props.checked !== checked) {
            setChecked(props.checked);
        }
    }, [props.checked])

    const handleClick = (e: any) => {
        // 如果是disabled 或者已经check
        if (disabled || checked) {
            return;
        }
        if (!('checked' in props)) {
            setChecked(true);
        }
        if (typeof onChange === 'function') {
            e.target = inputEl.current;
            onChange(e);
        }
    }

    return (
        <span className={wrapperCls} onClick={handleClick}>
            <span className={cls} >
                <input type="radio" className="liang-radio-input" value={value} ref={inputEl}/>
                <span className="liang-radio-inner"></span>
            </span>
            <span>{props.children}</span>
        </span>
    );
}

export default Radio;