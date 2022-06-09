import React, { createContext, useContext, useState } from "react";
import { useAppDispatch } from "./hooks";
import { sortTasks } from "./state/tasks/tasksSlice";

interface Filter {
  filter: string;
  order: number;
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
  ({ filter, order }: Filter) => void
>({} as any);
export const useFilter = () => {
  return useContext(FilterContext);
};
export const useUpdateFilter = () => {
  return useContext(FilterUpdateContext);
};

const FilterProvider: React.FC = ({ children }) => {
  const [filter, setFilter] = useState<Filter>(loadedFilter);
  const dispatch = useAppDispatch();

  const changeFilter = ({ filter, order }: Filter) => {
    setFilter({ filter, order });
    localStorage.setItem("filter", JSON.stringify({ filter, order }));
    dispatch(sortTasks({ filter, order }));
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
