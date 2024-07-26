import "./InputStyle.css";

import { Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import React from "react";

export enum InputType {
  TEXT = "text",
  NUMBER = "number",
  EMAIL = "email",
  PASSWORD = "password",
}
type Props = {
  type: InputType;
  name: string;
  icon?: IconProp;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  label?: string;
};

export default function Input({
  type,
  icon,
  onBlur,
  onChange,
  className,
  id,
  name,
  label,
}: Props) {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <div className={`Input ${className ? className : ""}`}>
        {icon && (
          <span className="icon">
            <FontAwesomeIcon icon={icon} />
          </span>
        )}
        <Field
          id={id}
          name={name}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </>
  );
}
