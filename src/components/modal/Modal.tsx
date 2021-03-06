import React from "react";

import "./modal.scss";
import Button from "../buttons/Button";
import Text from "../typography/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { _getIcon, _getAlertTypeStyle } from "../../utils/intent";
import Container from "ui-box";

type ModalProps = {
  open: boolean;
  header?: string;
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  primaryButton?: {
    name?: string;
    color?: "success" | "info" | "warning" | "danger" | "default";
  };
  secondaryButton?: {
    name?: string;
    color?: "success" | "info" | "warning" | "danger" | "default";
  };
  hideFooter?: boolean;
  type?: "success" | "info" | "warning" | "danger" | "default";
  [prop: string]: any;
};

const _sizeHash = {
  small: "400px",
  medium: "550px",
  large: "700px",
};

const Modal: React.FC<ModalProps> = ({
  open,
  header,
  size,
  children,
  onClose,
  onConfirm,
  primaryButton,
  secondaryButton,
  hideFooter,
  type,
  ...rest
}): JSX.Element => {
  const _getWidth = (): string => {
    let currSize = size ? size : "medium";
    let finalSize = Object.keys(_sizeHash).includes(currSize)
      ? currSize
      : "medium";

    return _sizeHash[finalSize];
  };
  const _handleOutsideClick = (e: any): void => {
    let divClassName = e.target.getAttribute("class");
    if (divClassName === "pal-modal") onClose();
  };

  return (
    <>
      {open && (
        <div
          style={{ display: open ? "flex" : "none" }}
          className="pal-modal"
          onClick={_handleOutsideClick}
        >
          <Container
            {...rest}
            style={{ width: _getWidth() }}
            className={`pal-modal-container ${!open && "pal-modal-exit"}`}
          >
            <div className="pal-modal-header">
              <Container
                color={_getAlertTypeStyle(type).color}
                display="flex"
                alignItems="center"
              >
                {type && (
                  <FontAwesomeIcon
                    icon={_getIcon(type)}
                    style={{ marginRight: "10px" }}
                  />
                )}
                <Text size="xlarge">{header}</Text>
              </Container>
              <Button appearance="tertiary" onClick={onClose} type="default">
                <FontAwesomeIcon icon={faTimes} />
              </Button>
            </div>
            <div className="pal-modal-body">{children}</div>
            {!hideFooter && (
              <div className="pal-modal-footer">
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div style={{ paddingRight: "15px" }}>
                    <Button
                      appearance="secondary"
                      type={type}
                      onClick={onClose}
                    >
                      {(secondaryButton || {}).name
                        ? (secondaryButton || {}).name
                        : "Cancel"}
                    </Button>
                  </div>
                  <Button onClick={onConfirm} type={type}>
                    {(primaryButton || {}).name
                      ? (primaryButton || {}).name
                      : "Confirm"}
                  </Button>
                </div>
              </div>
            )}
          </Container>
        </div>
      )}
    </>
  );
};

export default Modal;
