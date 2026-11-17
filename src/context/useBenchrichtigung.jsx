// context/useBenachrichtigung.ts

import { useContext } from "react";
import {BenachrichtigungContext} from "./BenachrichtigungsContext.jsx";


export function useBenachrichtigung() {
  const context = useContext(BenachrichtigungContext);

  if (!context) {
    throw new Error(
      "useBenachrichtigung benötigt den BenachrichtigungProvider"
    );
  }

  return context;
}