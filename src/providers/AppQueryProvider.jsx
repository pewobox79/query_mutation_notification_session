import {
  QueryClient,
  QueryClientProvider,
  MutationCache,
} from "@tanstack/react-query";
import {useBenachrichtigung} from "../context/useBenchrichtigung.jsx";


export function AppQueryProvider({children}) {
  const {anzeigen} = useBenachrichtigung()

  // Der MutationCache dient als Speicher für Mutationen.
// Normalerweise interagierst du nicht direkt mit dem MutationCache, sondern verwendest stattdessen einen QueryClient.

// Du kannst den MutationCache abonnieren (subscribe), da er von Subscribable erbt.
// Dadurch wirst du über definierte und sichere Änderungen am Cache informiert.

// Dazu gehören beispielsweise das Hinzufügen, Entfernen oder
// Aktualisieren von Mutationen.

  const queryClient = new QueryClient({
    mutationCache: new MutationCache({
      onSettled: (
        _data,
        error,
        _variables,
        _result,
        ctx
      ) => {
        console.log("onSettled", ctx);
        // Einzelne Mutations können das Modal deaktivieren
        if (ctx.meta?.benachrichtigen === false) {
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