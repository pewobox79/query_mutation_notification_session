import {useMutation} from "@tanstack/react-query";
async function createPost(post) {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      ...post,
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

export function CreatePostForm() {
  const mutation = useMutation({
    mutationFn: createPost //attribute werden automatisch durch useMutation weiter gegeben
  });

  return (
    <button
      type="button"
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          title: 'Mein Title',
          body: 'Mein body'
        })
      }
    >
      Post erstellen
    </button>
  );
}