import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { categoriesI, categoryI } from "types/category";

const initialState: categoriesI = {
  categories: [],
  loading: true,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state: categoriesI, action: PayloadAction<categoryI>) => {
      return {
        categories: [...state.categories, action.payload],
        loading: false,
      };
    },
    setCategories: ({}, action: PayloadAction<categoryI[]>) => {
      return {
        categories: action.payload,
        loading: false,
      };
    },
  },
});

export const { addCategory, setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
