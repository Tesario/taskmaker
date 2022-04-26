import React, { createContext, useContext, useState } from "react";

interface Routes {
  routes: {
    title: string;
    pathname?: string;
  }[];
}

export const BreadcrumpContext = createContext<Routes>({ routes: [] });
export const BreadcrumpUpdateContext = createContext<
  ({ routes }: Routes) => void
>({} as any);
export const useBreadcrump = () => {
  return useContext(BreadcrumpContext);
};
export const useUpdateBreadcrump = () => {
  return useContext(BreadcrumpUpdateContext);
};

const BreadcrumpProvider: React.FC = ({ children }) => {
  const [breadcrump, setBreadcrump] = useState<Routes>({ routes: [] });

  const changeBreadcrump = (routes: Routes) => {
    setBreadcrump(routes);
  };

  return (
    <BreadcrumpContext.Provider value={breadcrump}>
      <BreadcrumpUpdateContext.Provider value={changeBreadcrump}>
        {children}
      </BreadcrumpUpdateContext.Provider>
    </BreadcrumpContext.Provider>
  );
};

export default BreadcrumpProvider;
