import { Link } from "react-router-dom";
import { Category as CategoryType } from "../types";

interface CategoryProps {
  category: CategoryType;
  selectedCategory: string;
  clickHandler: Function;
}

const Category = ({category, selectedCategory, clickHandler}: CategoryProps) =>  {
  return (
    <li>
      <Link
        to={`?category=${category.id}`}
        className={(selectedCategory === category.id) ? 'selected' : ''}
        onClick={() => clickHandler(category.id)}
      >
        {category.title}
      </Link>
    </li>
  )
};

export default Category;
