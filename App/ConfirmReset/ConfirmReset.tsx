import React from "react";
import "./ConfirmReset.css";

type ConfirmResetProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmReset({
  onConfirm,
  onCancel,
}: ConfirmResetProps) {
  return (
    <div className="overlay">
      <div className="modal">
        <h2>Are you sure reset?</h2>
        <div className="buttons">
          <button className="yes" onClick={onConfirm}>
            Yes
          </button>
          <button className="no" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
