import React from "react";
import styles from "./confirmReset.module.css";

type ConfirmResetProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmReset({
  onConfirm,
  onCancel,
}: ConfirmResetProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Are you sure reset?</h2>
        <div className={styles.buttons}>
          <button className={styles.yes} onClick={onConfirm}>
            Yes
          </button>
          <button className={styles.no} onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
