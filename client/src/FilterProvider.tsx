import React, { createContext, useContext, useState } from "react";

export interface Filter {
  filter: string;
  order: number;
  search?: string;
}

interface ChangeFilter {
  filter?: string;
  order?: number;
  search?: string;
}

const filterJson = localStorage.getItem("filter");
const loadedFilter: Filter = filterJson
  ? JSON.parse(filterJson)
  : {
      filter: "created",
      order: 1,
    };

export const FilterContext = createContext<Filter>(loadedFilter);
export const FilterUpdateContext = createContext<
  ({ filter, order, search }: ChangeFilter) => void
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
