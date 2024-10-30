import { useState } from "react";
import { PRODUCTS, CATEGORIES } from "./constants/data";
import { Product, Category } from "./types";
import useFetchData from './hooks/useFetchData';

const App = () => {
  const categories = useFetchData(CATEGORIES);
  const products = useFetchData(PRODUCTS);

  const [selectedCategory, setSelectedCategory] = useState('');

  const productIsInSelectedCategoryOrNoCategory = (productCategories: Array<string>) => {
    return productCategories.includes(selectedCategory) || selectedCategory === '';
  }

  const renderProduct = (product: Product, i: number) => {
    return productIsInSelectedCategoryOrNoCategory(product.categories) ?
    (
      <li key={i}>
        <p>{product.title}</p>
        {/* <p>{product.description}</p> */}
      </li>
    ) :
    null;
  }

  return (
    <>
      <ul className="categories">
        {categories.map((category: Category, i) => {
          return (
            !category.hidden &&
            <li key={i}>
              <button 
                className={(selectedCategory === category.id) ? 'selected' : undefined}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.title}
              </button>
            </li>
          )
        })}
      </ul>
      <ul className="products">
        {products.map((product: Product, i) => {
          return renderProduct(product, i)
          })
        }
      </ul>
    </>
  );
}

export default App;