import { useEffect, useRef } from "react";


export function BenachrichtigungModal({meldung, onClose}) {

  // Das Modal ist mit dem htmlelement <dialog> erstellt. showModal() ist eine Methode der <dialog> Elemente, die das Modal öffnet.
  // Source: https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement

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