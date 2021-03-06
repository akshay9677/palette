import React, { useState } from "react";
import Container from "ui-box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import Radio from "../radio/Radio";
import { OptionProps } from "../select/Select";
import "./radiogroup.scss";

type RadioGroupProps = {
  options?: Array<OptionProps>;
  onChange?: (value: any) => void;
  isHorizontal?: boolean;
  disabled?: boolean;
  value?: any;
  validationText?: string;
  [prop: string]: any;
};

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  onChange,
  isHorizontal,
  value,
  disabled,
  validationText,
  ...rest
}): JSX.Element => {
  const [selectedItem, setSelectedValue] = useState(value);

  const _handleSelectionChange = (currItem: OptionProps): void => {
    setSelectedValue(currItem.value);
    if (onChange) onChange(currItem.value);
  };

  return (
    <Container {...rest} className="pal-radio-group-container">
      <Container
        display="inline-flex"
        flexDirection={isHorizontal ? "row" : "column"}
        justifyContent="center"
        alignItems="left"
      >
        {options &&
          options.map((option, index) => {
            return (
              <span
                key={index}
                style={{ paddingRight: isHorizontal ? "8px" : "0px" }}
              >
                <Radio
                  label={option.label}
                  checked={selectedItem === option.value}
                  onChange={_handleSelectionChange.bind(this, option)}
                  disabled={disabled}
                />
              </span>
            );
          })}
      </Container>
      {validationText && (
        <span className="validate-text">
          <span style={{ paddingRight: "4px" }}>
            <FontAwesomeIcon icon={faExclamationCircle} />
          </span>
          {validationText}
        </span>
      )}
    </Container>
  );
};

export default RadioGroup;
