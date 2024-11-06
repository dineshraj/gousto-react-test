import { Link } from "react-router-dom";
import { Category as CategoryType } from "../types";

interface CategoryProps {
  category: CategoryType;
  selectedCategory: string;
  clickHandler: Function;
}

const Category = ({category, selectedCategory, clickHandler}: CategoryProps) =>  {
  const categoryClass = selectedCategory === category.id ? 'category__link selected' : 'category__link';

  return (
    <Link
      to={`?category=${category.id}`}
      className={categoryClass}
      onClick={() => clickHandler(category.id)}
    >
      {category.title}
    </Link>
  )
};

export default Category;
