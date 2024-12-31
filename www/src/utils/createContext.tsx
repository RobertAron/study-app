import React, { createContext, use } from "react";
export function generateContext<ProviderProps, ProvidedValue>(
  generateProvider: (
    Provider: React.Context<ProvidedValue | null>,
  ) => (props: ProviderProps) => React.ReactNode,
) {
  const Context = createContext<ProvidedValue | null>(null);
  const useContext = () => {
    const context = use(Context);
    if (context === null)
      throw new Error("useMyContext must be used within a MyProvider");
    return context;
  };
  const Provider = generateProvider(Context);
  return {
    useContext,
    Provider,
  };
}