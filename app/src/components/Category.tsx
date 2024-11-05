import { Link } from "react-router-dom";
import { Category as CategoryType } from "../types";

interface CategoryProps {
  category: CategoryType;
  selectedCategory: string;
  clickHandler: Function;
}

const Category = ({category, selectedCategory, clickHandler}: CategoryProps) =>  {
  return (
    <Link
      to={`?category=${category.id}`}
      className={`category__link${(selectedCategory === category.id) ? ' selected' : ''}`}
      onClick={() => clickHandler(category.id)}
    >
      {category.title}
    </Link>
  )
};

export default Category;
