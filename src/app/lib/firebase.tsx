"use client"
/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { initializeApp, getApps } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import {
  connectDataConnectEmulator,
  getDataConnect,
} from "firebase/data-connect";
// import { connectorConfig } from '@movie/dataconnect';
import { createContext } from "react";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx7ShZv2I-9JU04Ue6Su10DozfHXUqFBA",
  authDomain: "fredzqm-staging.firebaseapp.com",
  databaseURL: "https://fredzqm-staging.firebaseio.com",
  projectId: "fredzqm-staging",
  storageBucket: "fredzqm-staging.appspot.com",
  messagingSenderId: "435410221340",
  appId: "1:435410221340:web:f8966d312d2174303022d9"
};

const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(firebaseApp);
// const dataconnect = getDataConnect(firebaseApp, connectorConfig);

if (process.env.NODE_ENV === "development") {
  // connectDataConnectEmulator(dataconnect, "127.0.0.1", 9399, false);
  connectAuthEmulator(auth, "http://localhost:9099");
}

const AuthContext = createContext(auth);

function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
