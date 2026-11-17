// features/users/CreateUser.tsx

import { useMutation } from "@tanstack/react-query";
import {useBenachrichtigung} from "../../context/useBenchrichtigung.jsx";

async function createUser(user) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (!response.ok) {
    throw new Error("Benutzer konnte nicht gespeichert werden");
  }

  return response.json();
}

export function CreateUser() {
  const { anzeigen } = useBenachrichtigung();

  const mutation = useMutation({
    mutationFn: createUser,
    onSettled: async (_data, error, variables,result, context) => {

      console.log("onSettled", _data, error, context);
      if (error) {
        anzeigen({
          typ: "error",
          nachricht: "Benutzer konnte nicht gespeichert werden.",
        });

        return;
      }

      await context.client.invalidateQueries({
        queryKey: ["users"],
      });

      anzeigen({
        typ: "success",
        nachricht: "Benutzer wurde erfolgreich gespeichert.",
      });
    },
  });

  return (
    <button
      type="button"
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({ name: "Max Mustermann" })
      }
    >
      Benutzer speichern
    </button>
  );
}