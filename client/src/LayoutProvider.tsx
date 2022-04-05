import React, { createContext, useContext, useState } from "react";

interface Layout {
  columns: 1 | 2;
  type: "cards" | "rows";
}
const layoutJson = localStorage.getItem("layout");
const loadedLayout: Layout = layoutJson
  ? JSON.parse(layoutJson)
  : {
      columns: 1,
      type: "cards",
    };

export const LayoutContext = createContext<Layout>(loadedLayout);
export const LayoutUpdateContext = createContext<
  ({ columns, type }: Layout) => void
>({} as any);
export const useLayout = () => {
  return useContext(LayoutContext);
};
export const useUpdateLayout = () => {
  return useContext(LayoutUpdateContext);
};

const LayoutProvider: React.FC = ({ children }) => {
  const [layout, setLayout] = useState<Layout>(loadedLayout);

  const changeLayout = ({ columns, type }: Layout) => {
    setLayout({ columns, type });
    localStorage.setItem("layout", JSON.stringify({ columns, type }));
  };

  return (
    <LayoutContext.Provider value={layout}>
      <LayoutUpdateContext.Provider value={changeLayout}>
        {children}
      </LayoutUpdateContext.Provider>
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
