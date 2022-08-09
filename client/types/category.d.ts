export interface categoryI {
  name: string;
  uuid: string;
}

export interface categoriesI {
  categories: categoryI[];
  loading: boolean;
}
