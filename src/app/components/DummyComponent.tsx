'use client'
import { use } from "react";

export function DummyComponent({ data }) {
  const d: any = use(data);
  console.log(typeof(d), d);

  return (
    <>
      <h4>
        OK: {d.dummy}
      </h4>
    </>
  )
}
