import React, { ReactNode, CSSProperties, useState, useContext, ReactElement, useEffect } from 'react';
import classNames from 'classnames';
import Schema, {Rules} from 'async-validator';

import FormContext from './FormContext';

import './grid.scss';

export interface itemProps {
  className?: string;
  label?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  children?: ReactElement;
  style?: CSSProperties;
  name?: string;
  valuePropName?: string;
  rules?: Array<Object>;
}

const getValueFromEvent = (e) => {
  if (!e || !e.target) {
    return e;
  }

  const { target } = e;
  if (target.type === 'checkbox') {
    return target.checked;
  } else if (target.type === 'radio') {
    return target.value;
  }

  return target.value;
}

const Item = (props: itemProps) => {
  const { className,
    label,
    size = 'medium', children, style, name,
    valuePropName,
    rules,
    ...others } = props;

  const [value, setValue] = useState();
  const [error, setError] = useState('');

  const {
    onValueChange,
    labelCol,
    wrapperCol,
    values,
    validateRegiste,
    ...otherContext } = useContext(FormContext);

  useEffect(() => {
    if (values?.[name] !== value) {
      setValue(values?.[name]);
    }
  }, [values, values?.[name]])

  const cls = classNames({
    'bobo-form-item': true,
    [`bobo-form-horizontal`]: true,
    'bobo-form-item-with-help bobo-form-item-has-error': error,
    [className as string]: !!className
  });

  const propsName: any = {
    status: error? 'error': undefined,
  };
  if (valuePropName) {
    propsName[valuePropName] = value;
  } else {
    propsName.value = value;
  }

  const handleValidate = (value) => {
    let errorMsg = null;

    if (Array.isArray(rules) && rules.length) {
      const descriptor: Rules = {
        [name]: rules.map(rule => {
          return {
            type: 'string',
            ...rule
          }
        })
      }

      const validator = new Schema(descriptor);

      validator.validate({ [name]:value }, (errors, fields) => {
        if (errors) {
          // validation failed, errors is an array of all errors
          // fields is an object keyed by field name with an array of
          // errors per field

          if (errors?.length) {
            setError(errors[0].message as string);
            errorMsg = errors[0].message;
          }
        } else {
          // validation passed
          setError('');
          errorMsg = null;
        }
      });

    }

    return errorMsg;
  }

  useEffect(() => {
    validateRegiste(name, () => handleValidate(value));
  }, [value]);

  const childEle = React.Children.toArray(children).length >1? children: React.cloneElement(children, {
    ...propsName,
    onChange: (e) => {
      const value = getValueFromEvent(e);
      setValue(value);
      onValueChange(name, value);

      handleValidate(value);
    }
  });

  const { span: labelSpan } = labelCol;
  const { span: wrapperSpan } = wrapperCol;

  return (
    <div className={cls}>
      <div className="bobo-row bobo-form-item-row">
        <div className={`bobo-col bobo-col-${labelSpan} bobo-form-item-label`}>
          {
            label && (
              <label className="bobo-form-item-required" >{label}</label>
            )
          }
        </div>

        <div className={`bobo-col bobo-col-${wrapperSpan} bobo-form-item-control`}>
          <div className="bobo-form-item-control-input">
            <div className="bobo-form-item-control-input-content">
              {childEle}
            </div>
          </div>
          {error && (<div style={{ display: 'flex', flexWrap: 'nowrap' }}>
            <div className="bobo-form-item-explain bobo-form-item-explain-connected">
              <div role="alert" className="bobo-form-item-explain-error">{error}</div>
            </div>
            <div style={{ width: 0, height: 24 }}></div>
          </div>)
          }
        </div>
      </div>
    </div>
  )
}

export default Item;