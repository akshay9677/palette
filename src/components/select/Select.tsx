import React, { useEffect, useRef, useState } from "react";
import Container from "ui-box";
import { createPopper } from "@popperjs/core";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCheck,
  faTimesCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import Badge from "../badge/Badge";

import "./index.scss";

type OptionProps = {
  label: string;
  value: any;
};

type SelectProps = {
  width?: number;
  height?: number;
  placeholder?: string;
  disabled?: boolean;
  options?: Array<OptionProps>;
  isInvalid?: boolean;
  validationText?: string;
  onChange?: (value: any) => void;
  value?: OptionProps;
  clearable?: boolean;
  multiple?: boolean;
  tagColor?: "green" | "red" | "blue" | "yellow" | "purple" | "default";
  collapseTags?: boolean;
};

const getTextSizeForControlHeight = (height: number) => {
  return `${(0.45 * height).toFixed()}px`;
};

const Select: React.FC<SelectProps> = ({
  width,
  height,
  placeholder,
  disabled,
  options,
  isInvalid,
  validationText,
  onChange,
  value,
  clearable,
  multiple,
  tagColor,
  collapseTags,
}): JSX.Element => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    value ? value : { label: "", value: null }
  );
  const [multiSelectItems, setMultiSelectItems] = useState([]);

  const inputRef = useRef(null);
  const selectPopupRef = useRef(null);
  const selectParent = useRef(null);

  useEffect(() => {
    if (onChange) onChange(multiple ? multiSelectItems : selectedItem);
  }, [selectedItem, multiSelectItems]);

  const TagsList = (): JSX.Element => {
    if (collapseTags) {
      return (
        <>
          {multiSelectItems.length > 0 && (
            <>
              <Badge
                label={(multiSelectItems[0] || {}).label}
                showClose
                color={tagColor ? tagColor : "purple"}
                onClose={_removeMultiItem.bind(this, multiSelectItems[0])}
              />
              {multiSelectItems.length - 1 > 0 && (
                <span style={{ paddingLeft: "2px" }}>
                  <Badge
                    label={`+${multiSelectItems.length - 1}`}
                    color={tagColor ? tagColor : "purple"}
                  />
                </span>
              )}
            </>
          )}
        </>
      );
    } else {
      return (
        <>
          {multiSelectItems.length > 0 &&
            multiSelectItems.map((item, index) => {
              let { label } = item;
              return (
                <span key={index} style={{ padding: "0px 2px" }}>
                  <Badge
                    label={label}
                    showClose
                    color={tagColor ? tagColor : "purple"}
                    onClose={_removeMultiItem.bind(this, item)}
                  />
                </span>
              );
            })}
        </>
      );
    }
  };

  const _openSelectDropDown = (): void => {
    if (!disabled) {
      const target = inputRef.current;
      const source = selectPopupRef.current;
      setOpenDropdown(!openDropdown);
      if (target && source) {
        createPopper(target, source, {
          placement: "bottom",
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 6],
              },
            },
          ],
        });
      }
    }
  };

  const _isSelectedItem = (currOption: OptionProps): boolean => {
    if (multiple) {
      let isItemPresent = multiSelectItems.find(
        (item) => item.value === currOption.value
      );
      return isItemPresent ? true : false;
    } else {
      return selectedItem && currOption.value === selectedItem.value;
    }
  };

  const _clearSelection = (): void => {
    if (multiple) setMultiSelectItems([]);
    else setSelectedItem({ label: "", value: null });
  };

  const _onClickItem = (currOption: OptionProps) => {
    if (multiple) {
      if (_isSelectedItem(currOption)) {
        _removeMultiItem(currOption);
      } else {
        let currItems = [...multiSelectItems, currOption];
        setMultiSelectItems(currItems);
      }
    } else {
      if (_isSelectedItem(currOption)) {
        setSelectedItem({ label: "", value: null });
      } else {
        setSelectedItem(currOption);
      }
      setOpenDropdown(false);
    }
  };

  const _removeMultiItem = (currOption: OptionProps): void => {
    const afterRemoveItems = multiSelectItems.filter(
      (item) => item.value !== currOption.value
    );
    setMultiSelectItems(afterRemoveItems);
  };

  return (
    <div className="pal-select" ref={selectParent}>
      <Container
        width={width ? width : 300}
        height={height && height >= 24 ? height : 32}
        className={`pal-select-container ${disabled ? "disabled" : ""} ${
          isInvalid ? "isInvalid" : ""
        }`}
        ref={inputRef}
      >
        {multiple && <TagsList />}
        <input
          onClick={_openSelectDropDown}
          readOnly
          type="input"
          className="pal-select-input-field"
          placeholder={placeholder}
          disabled={disabled}
          value={selectedItem.label}
          style={{
            fontSize: getTextSizeForControlHeight(
              height && height >= 24 ? height : 32
            ),
          }}
        />
        {clearable &&
          (!multiple ? selectedItem.value : multiSelectItems.length > 0) && (
            <span
              className="pal-select-down-arrow pal-select-clear"
              onClick={_clearSelection}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </span>
          )}
        <span
          className={`pal-select-down-arrow ${
            openDropdown ? "pal-arrow-expanded" : ""
          }`}
          onClick={_openSelectDropDown}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </Container>
      {isInvalid && validationText && (
        <span className="validate-text">
          <span style={{ paddingRight: "4px" }}>
            <FontAwesomeIcon icon={faExclamationCircle} />
          </span>
          {validationText}
        </span>
      )}
      <div ref={selectPopupRef} className="pal-select-popover-content">
        {openDropdown && (
          <Container
            width={width ? width : 300}
            className="pal-select-popover-body"
          >
            {options &&
              options.map((currOption, index) => {
                let { label } = currOption;
                return (
                  <div
                    key={index}
                    className={`pal-select-dropdown-item ${
                      _isSelectedItem(currOption) ? "pal-selected-item" : ""
                    }`}
                    onClick={_onClickItem.bind(this, currOption)}
                  >
                    <div>{label}</div>
                    {_isSelectedItem(currOption) && (
                      <div className="pal-selected-tick">
                        <FontAwesomeIcon icon={faCheck} />
                      </div>
                    )}
                  </div>
                );
              })}
          </Container>
        )}
      </div>
    </div>
  );
};

export default Select;