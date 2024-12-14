import { Suspense, use } from "react";

import { Loading } from "../../components/Loading";
import { Timeout } from "../../components/Timeout";
import { DummyComponent } from "../../components/DummyComponent";
import { getDateString, getRandomUUID } from "../../utils";

export const dynamic = "force-dynamic";

async function getData(): Promise<any> {
  const req = await fetch("http://localhost:3000/api/dummy");
  return req.json();
}

export default async function Page() {
  const dummyData = getData();
  return (
    <main className="content">
      <Suspense fallback={<Loading />}>
        <DummyComponent data={dummyData}></DummyComponent>
      </Suspense>
      <header>
        <h1 className="heading">A server generated page!</h1>
        <h2>
          <Suspense fallback={<Loading />}>
            <Timeout>Streaming!</Timeout>
          </Suspense>
        </h2>
      </header>

      <section className="data-container">
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
