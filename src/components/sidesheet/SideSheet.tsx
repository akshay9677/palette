import React from "react";
import Container from "ui-box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./sidesheet.scss";
import Text from "../typography/Text";

type SideSheetProps = {
  open: boolean;
  width?: number;
  onClose: () => void;
  children?: React.ReactNode;
  position?: "right" | "left";
  showClose?: boolean;
  header?: string;
  [prop: string]: any;
};

const SideSheet: React.FC<SideSheetProps> = ({
  open,
  width,
  onClose,
  children,
  position,
  showClose,
  header,
  ...rest
}): JSX.Element => {
  const _handleOutsideClick = (e: any): void => {
    let clickedDiv = e.target.getAttribute("id");
    if (clickedDiv === "pal-side-sheet-main") onClose();
  };
  const _isRightPosition = (): boolean => {
    if (position && position === "left") return false;
    else return true;
  };
  return (
    <>
      {open && (
        <div
          style={{
            display: open ? "flex" : "none",
            justifyContent: _isRightPosition() ? "flex-end" : "flex-start",
          }}
          onClick={_handleOutsideClick}
          id="pal-side-sheet-main"
        >
          <Container
            {...rest}
            id="pal-side-sheet-child"
            className={
              _isRightPosition() ? "modal-entry-right" : "modal-entry-left"
            }
          >
            {_isRightPosition() && !showClose && (
              <div
                className="pal-side-sheet-close-btn"
                onClick={() => onClose()}
              >
                <FontAwesomeIcon icon={faTimes} />
              </div>
            )}
            <Container
              width={width ? width : 400}
              height="100vh"
              zIndex={99999}
              backgroundColor={"#ffffff"}
              paddingX={20}
              paddingY={10}
            >
              {header && <Text size="xlarge">{header}</Text>}
              {children}
            </Container>
            {!_isRightPosition() && !showClose && (
              <div
                className="pal-side-sheet-close-btn"
                onClick={() => onClose()}
              >
                <FontAwesomeIcon icon={faTimes} />
              </div>
            )}
          </Container>
        </div>
      )}
    </>
  );
};

export default SideSheet;
