import React, { createContext, useContext, useState } from "react";

interface QA {
  question: number;
  answers: "Yes" | "No";
}

export interface ImetaContext {
  admin: { rememberMe: boolean };
  questionnaire: { name: string; show: boolean; answers?: QA[] };
  feedback: boolean;
  login: boolean;
  assess: boolean;
}

// CREATE CONTEXT
export const MetaContext = createContext<[ImetaContext, (state: any) => void]>([
  {
    admin: { rememberMe: true },
    questionnaire: { name: "", show: false },
    feedback: false,
    login: false,
    assess: false,
  },
  () => { },
]);

// CONTEXT PROVIDER 
export const MetaContextProvider = ({ children }: any) => {

  // INITIAL STATES
  const [metaState, setMetaState] = useState({
    admin: { rememberMe: true },
    questionnaire: { name: "", show: false },
    feedback: false,
    login: false,
    assess: false,
  });

  return (
    <>
      {/* @ts-ignore */}
      <MetaContext.Provider value={[metaState, setMetaState]}>
        {children}
      </MetaContext.Provider>
    </>
  );
};
