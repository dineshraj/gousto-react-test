import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PRODUCTS, CATEGORIES } from "./constants/data";
import { Product as ProductType, Category as CategoryType } from "./types";
import useFetchData from './hooks/useFetchData';
import Product from "./components/Prooduct";

const App = () => {
  const categories = useFetchData(CATEGORIES);
  const products = useFetchData(PRODUCTS);
  
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryIdFromUrl = params.get('category') || '';
    setSelectedCategory(categoryIdFromUrl);
    document.title = getCategoryFromId(categoryIdFromUrl) || document.title;
  }, [location.search, categories])

  const getCategoryFromId = (categoryIdFromUrl: string) => {
      const category: CategoryType =
      categories
      .find((category: CategoryType) => category.id === categoryIdFromUrl) as unknown as CategoryType;
      
      if (category) {
        return category.title;
      }
  }

  const productIsInSelectedCategoryOrNoCategory = (productCategories: Array<string>) => {
    return productCategories.includes(selectedCategory) || selectedCategory === '';
  }

  const productIsInSearchTermOrNoSearchTerm = (productName: string) => {
    const lowerCaseProductName = productName.toLowerCase();

    return lowerCaseProductName.includes(searchTerm) || searchTerm === '';
  }

  const toggleSelectedProduct = (currentProductId: string) => {
    selectedProduct === currentProductId ? setSelectedProduct('') : setSelectedProduct(currentProductId)
  }

  const handleSearchTermInput = ({ target }: { target: HTMLInputElement }) => {
    setSearchTerm(target.value.toLowerCase());
  }

  const renderProduct = (product: ProductType, i: number) => {
    return (
      productIsInSelectedCategoryOrNoCategory(product.categories) &&
      productIsInSearchTermOrNoSearchTerm(product.title) ?
        <Product key={i} selectedProduct={selectedProduct} product={product} handleClick={toggleSelectedProduct} /> : null
    )
  }

  return (
    <>
      <ul className="categories">
        {categories.map((category: CategoryType, i) => {
          return (
            !category.hidden &&
            <li key={i}>
              <Link
                to={`?category=${category.id}`}
                className={(selectedCategory === category.id) ? 'selected' : ''}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.title}
              </Link>
            </li>
          )
        })}
      </ul>
      <input 
        type="search"
        name="search"
        className="search"
        value={searchTerm}
        data-testid="search"
        onChange={handleSearchTermInput}
      />
      <ul className="products">
        {products.map((product: ProductType, i) => {
          return renderProduct(product, i)
          })
        }
      </ul>
    </>
  );
}

export default App;