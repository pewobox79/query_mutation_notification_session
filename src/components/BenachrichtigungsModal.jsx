// components/BenachrichtigungModal.tsx

import { useEffect, useRef } from "react";

export function BenachrichtigungModal({meldung, onClose}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (meldung && !dialog.open) {
      dialog.showModal();
    } else if (!meldung && dialog.open) {
      dialog.close();
    }
  }, [meldung]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="meldung-titel"
    >
      <h2 id="meldung-titel">
        {meldung?.typ === "success"
          ? "Erfolgreich"
          : "Fehler"}
      </h2>

      <p>{meldung?.nachricht}</p>

      <button type="button" onClick={onClose}>
        Schließen
      </button>
    </dialog>
  );
}