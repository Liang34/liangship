import React, { ReactNode, CSSProperties, useState, useContext, useRef, useMemo } from 'react';
import classNames from 'classnames';

import Radio from '../Radio';

import './index.scss';

export interface RadioGroupProps extends React.HTMLAttributes<HTMLInputElement> {
    value?: string;
    defaultValue?: string;
    onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
    /**
     * 禁用
     */
    disabled?: boolean;
    className?: string;
    children?: ReactNode;
    style?: CSSProperties;
}

const RadioGroup = (props: RadioGroupProps) => {
    const {disabled, className, children, style, onChange,
        ...others} = props;

    const [value, setValue] = useState(props.defaultValue || props.value);

    const cls = classNames({
        'liang-radio-group': true,
    });

    const handleClick = (e: any) => {
        const value = e.target.value;
        setValue(value);
    }

    const newChildren = useMemo(() => React.Children.map(children, (child:any) => {
        if (child.type !== Radio) {
            return null;
        }
        return React.cloneElement(child, {
            checked: child.props.value === value,
            disabled: disabled,
            onChange: handleClick,
        });
    }), [value])

    return (
        <span className={cls}>
            {newChildren}
        </span>
    );
}

export default RadioGroup;