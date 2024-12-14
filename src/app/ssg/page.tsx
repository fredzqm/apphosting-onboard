import { UserComponent } from "../components/User";
import { getDateString, getRandomUUID } from "../utils";
import { headers, cookies } from 'next/headers';
import * as admin from 'firebase-admin';

export default async function Page() {
  const headersList = await headers()
  headersList.forEach((k, v) => {
      console.log(`${k}: ${v}`);
  })

  const cookieStore = cookies(); 
  const allCookies = cookieStore.getAll();
  console.log('Cookies:', allCookies); 
  const idToken = cookieStore.get("X-Firebase-Auth-Token")?.value;
  console.log('idToken', idToken);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: 'fredzqm-staging',
      // ... other configuration options, if needed
    });
  }

  // Verify the ID token while checking if the token is revoked by passing checkRevoked
  // to true.
  const decodedToken = await admin.auth().verifyIdToken(idToken!, true);
  // Generate a session cookie
  const cookie = await admin.auth().createSessionCookie(decodedToken.uid, {
    expiresIn: 60 * 60 * 24 * 5 * 1000, // 5 days (adjust as needed)
  });
  cookieStore.set("Server-set-auth-token", cookie);

  return (
    <main className="content">
      <h1 className="heading">SSG</h1>

      <section className="data-container">
        <article className="card">
          <UserComponent />
        </article>
        <article className="card">
          <p>Generated</p>
          <h2>{getDateString()}</h2>
        </article>
        <article className="card">
          <p>UUID</p>
          <h2>{getRandomUUID()}</h2>
        </article>
      </section>
    </main>
  );
}
