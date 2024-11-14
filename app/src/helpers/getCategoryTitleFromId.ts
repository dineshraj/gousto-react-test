import { Category } from "../types";

const getCategoryTitleFromId = (id: string, categories: Category[]) => {
  const category: Category =
  categories
  .find((category: Category) => category.id === id) as unknown as Category;
  
  if (category) {
    return category.title;
  }
};

export default getCategoryTitleFromId;