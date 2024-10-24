import { useEffect, useState } from "react";
import { PRODUCTS, CATEGORIES } from "./constants/data";
import { Product, Category } from "./types";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchData = async (url: string, setter: Function) => {
    const response = await fetch(url);
    const json = await response.json();

    setter(json.data);
  };

  useEffect(() => {
    fetchData(CATEGORIES, setCategories);
    fetchData(PRODUCTS, setProducts);
  }, []);

  return (
    <>
      <ul className="categories">
        {categories.map((category: Category, i) => {
          return !category.hidden && <li key={i}>{category.title}</li>
        })}
      </ul>
      <ul className="products">
        {products.map((product: Product, i) => {
          return (
            <li key={i}>
              <p>{product.title}</p>
              <p>{product.description}</p>
            </li>
          )
          })}
      </ul>
    </>
  );
}

export default App;