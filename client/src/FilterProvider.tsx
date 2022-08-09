import React, { createContext, useContext, useState } from "react";

export interface Filter {
  filter: string;
  order: number;
  status: ["completed" | "expired" | "uncompleted"];
  category?: string | null;
}

interface ChangeFilter {
  filter?: string;
  order?: number;
  status?: ["completed" | "expired" | "uncompleted"];
  category?: string | null;
}

const filterJson = localStorage.getItem("filter");

const loadedFilter: Filter = filterJson
  ? JSON.parse(filterJson)
  : {
      filter: "created",
      order: 1,
      status: ["completed", "expired", "uncompleted"],
    };

export const FilterContext = createContext<Filter>(loadedFilter);
export const FilterUpdateContext = createContext<
  ({ filter, order, status, category }: ChangeFilter) => void
>({} as any);
export const useFilter = () => {
  return useContext(FilterContext);
};
export const useUpdateFilter = () => {
  return useContext(FilterUpdateContext);
};

const FilterProvider: React.FC = ({ children }) => {
  const [filter, setFilter] = useState<Filter>(loadedFilter);

  const changeFilter = (values: ChangeFilter) => {
    const newFilter: Filter = { ...filter, ...values };

    setFilter({ ...newFilter });
    localStorage.setItem("filter", JSON.stringify(newFilter));
  };

  return (
    <FilterContext.Provider value={filter}>
      <FilterUpdateContext.Provider value={changeFilter}>
        {children}
      </FilterUpdateContext.Provider>
    </FilterContext.Provider>
  );
};

export default FilterProvider;
