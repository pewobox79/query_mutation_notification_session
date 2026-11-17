// providers/AppQueryProvider.tsx

import {useState} from "react";
import {
  QueryClient,
  QueryClientProvider,
  MutationCache,
} from "@tanstack/react-query";
import {useBenachrichtigung} from "../context/useBenchrichtigung.jsx";


export function AppQueryProvider({children}) {
  const {anzeigen} = useBenachrichtigung();

  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onSettled: (
        _data,
        error,
        _variables,
        _onMutateResult,
        mutation
      ) => {
        // Einzelne Mutations können das Modal deaktivieren
        if (mutation.meta?.benachrichtigen === false) {
          return;
        }

        if (error) {
          anzeigen({
            typ: "error",
            nachricht:
              "Die Aktion konnte nicht ausgeführt werden.",
          });
        } else {
          anzeigen({
            typ: "success",
            nachricht:
              "Die Aktion wurde erfolgreich ausgeführt.",
          });
        }
      },
    })
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}