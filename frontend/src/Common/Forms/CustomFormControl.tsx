import React, { FunctionComponent, InputHTMLAttributes, useContext } from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import classNames from 'classnames';
import { useField } from 'formik';
import Style from './form.module.scss';

export const CustomFormControl: FunctionComponent<
  InputHTMLAttributes<any> & FormControlProps & { name: string; labelName: string }
> = ({ name, labelName, ...props }) => {
  const [field, meta, helper] = useField(name);

  return (
    <>
      <Form.Group className={Style.formGroup}>
        <Form.Label className={Style.formLabel}>{labelName}</Form.Label>
        <Form.Control
          className={classNames({ 'invalid-border': meta.touched && meta.error })}
          placeholder={props.placeholder}
          {...props}
          {...field}
          required
        />
        {meta.touched && meta.error ? (
          <div className={Style['invalid-text']}>{meta.error}</div>
        ) : null}
      </Form.Group>
    </>
  );
};
