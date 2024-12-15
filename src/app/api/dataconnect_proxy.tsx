import { cookies } from 'next/headers';

const apiBase = "https://firebasedataconnect.googleapis.com/v1beta/";
const connectorURL = apiBase + "projects/fredzqm-staging/locations/us-central1/services/codelab-dataconnect-web/connectors/movie-connector:executeQuery";

export async function ExecuteQuery(operationName: string): Response {
  const cookieStore = cookies(); 
  const idToken = cookieStore.get("X-Firebase-Auth-Token")?.value;
  console.log('idToken', idToken);

  const resp = await fetch(connectorURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      operationName: operationName,
    })
  })
  console.log("response", resp.status);
  if (!resp.ok) {
    // Handle errors (e.g., throw an error or display a message)
    throw new Error(`HTTP error! status: ${resp.status}`); 
  }
  const bd = await resp.json();
  console.log("body", bd);
  return Response.json(bd);
}