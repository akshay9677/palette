import React, { useEffect, useRef, useState } from "react";
import { createPopper } from "@popperjs/core";
import Container from "ui-box";

import "./popover.scss";

type PopoverProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  trigger?: "hover" | "click";
  placement?:
    | "right"
    | "right-start"
    | "right-end"
    | "top"
    | "top-start"
    | "top-end"
    | "left"
    | "left-start"
    | "left-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end";
  hideArrow?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  togglePopup?: boolean;
  [prop: string]: any;
};

const PLACEMENT_HASH = [
  "right",
  "right-start",
  "right-end",
  "top",
  "top-start",
  "top-end",
  "left",
  "left-start",
  "left-end",
  "bottom",
  "bottom-start",
  "bottom-end",
];

const Popover: React.FC<PopoverProps> = ({
  children,
  content,
  placement,
  trigger,
  hideArrow,
  onClose,
  onOpen,
  togglePopup,
  ...rest
}): JSX.Element => {
  const [showPopover, setShowPopover] = useState(
    togglePopup ? togglePopup : false
  );
  const popoverRef = useRef(null);
  const popoverParentRef = useRef(null);

  useEffect(() => {
    if (togglePopup) openPopover(togglePopup);
  }, [togglePopup]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (e: any) => {
    const parentRef: any = popoverParentRef.current;
    if (parentRef && !parentRef.contains(e.target)) {
      setShowPopover(false);
    }
  };

  const openPopover = (canShowPopup: boolean): void => {
    const popoverContent = popoverRef.current;
    const popoverParent = popoverParentRef.current;

    if (showPopover && onClose) onClose();
    else if (onOpen) onOpen();

    setShowPopover(canShowPopup);
    if (popoverParent && popoverContent) {
      createPopper(popoverParent, popoverContent, {
        placement:
          placement && PLACEMENT_HASH.includes(placement)
            ? placement
            : "bottom",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 1],
            },
          },
        ],
      });
    }
  };
  const _onClickOpen = (e: any): void => {
    if (trigger === "click" || !trigger) {
      openPopover(!showPopover);
    }
  };
  const _onHoverPopover = (e: any): void => {
    if (trigger === "hover") {
      openPopover(!showPopover);
    }
  };
  return (
    <Container
      {...rest}
      className="pal-popover"
      onClick={_onClickOpen}
      onMouseEnter={_onHoverPopover}
      onMouseLeave={_onHoverPopover}
      ref={popoverParentRef}
    >
      <div id="pal-popover-parent">{children}</div>
      <div id="pal-popover-content" ref={popoverRef}>
        {showPopover && (
          <>
            <Container className="pal-popover-content-main">
              {content}
            </Container>
          </>
        )}

        {!hideArrow && (
          <div
            id="arrow"
            style={{ visibility: showPopover ? "visible" : "hidden" }}
            data-popper-arrow
          ></div>
        )}
      </div>
    </Container>
  );
};

export default Popover;
