import {
  createContext,
  useState
} from "react";
import {BenachrichtigungModal} from "../components/BenachrichtigungsModal.jsx";


export const BenachrichtigungContext = createContext(null);

export function BenachrichtigungProvider({ children }) {
  const [meldung, setMeldung] = useState(null);

  const anzeigen = (neueMeldung) => {
    // neueMeldung ist ein object mit OBJECTTYPE {type: "", nachricht:""}
    setMeldung(neueMeldung);
  };

  const schliessen = () => {
    setMeldung(null);
  };

  return (
    <BenachrichtigungContext.Provider value={{ anzeigen, schliessen }} >
      {children}

      <BenachrichtigungModal
        meldung={meldung}
        onClose={schliessen}
      />
    </BenachrichtigungContext.Provider>
  );
}