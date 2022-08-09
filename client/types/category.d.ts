export interface categoryI {
  name: string;
  uuid: string | null;
}

export interface categoriesI {
  categories: categoryI[];
  loading: boolean;
}
