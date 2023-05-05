
import React from "react";

type Props = {
  isActive: boolean;
};

const Overlay = (props: Props) => {
  if (props.isActive) {
    return (
      <div
        className="menu-overlay z-20"
      />
    );
  }

  return (
    <></>
  );
};

export default Overlay;
