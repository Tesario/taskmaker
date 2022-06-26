import React, { createContext, useContext, useState } from "react";

export interface Filter {
  filter: string;
  order: number;
  search?: string;
  status: ["completed" | "expired" | "uncompleted"];
}

interface ChangeFilter {
  filter?: string;
  order?: number;
  search?: string;
  status?: ["completed" | "expired" | "uncompleted"];
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
  ({ filter, order, search, status }: ChangeFilter) => void
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
    let newFilter: Filter = Object.assign({ ...filter, ...values });
    setFilter({ ...newFilter });
    delete newFilter.search;

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
