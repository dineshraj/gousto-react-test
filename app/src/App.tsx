import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PRODUCTS, CATEGORIES } from "./constants/data";

import { Product as ProductType, Category as CategoryType } from "./types";
import useFetchData from './hooks/useFetchData';

import Product from "./Components/Product";
import Category from "./Components/Category";
import Search from "./Components/Search";

import getCategoryTitleFromId from './helpers/getCategoryTitleFromId';
import productIsInSelectedCategoryOrNoCategory from './helpers/productIsInSelectedCategoryOrNoCategory';
import productIsInSearchTermOrNoSearchTerm from './helpers/productIsInSearchTermOrNoSearchTerm';

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
    document.title = getCategoryTitleFromId(categoryIdFromUrl, categories) || document.title;
  }, [location.search, categories])

  const toggleSelectedProduct = (currentProductId: string) => {
    selectedProduct === currentProductId ? setSelectedProduct('') : setSelectedProduct(currentProductId)
  }

  const handleSearchTermInput = ({ target }: { target: HTMLInputElement }) => {
    setSearchTerm(target.value.toLowerCase());
  }

  const renderProduct = (product: ProductType) => {
    return (
      productIsInSelectedCategoryOrNoCategory(product.categories, selectedCategory) &&
      productIsInSearchTermOrNoSearchTerm(product.title, searchTerm) ?
        <Product selectedProduct={selectedProduct} product={product} handleClick={toggleSelectedProduct} /> : null
    )
  }

  return (
    <>
      <ul className="categories">
        {categories.map((category: CategoryType, i) => {
          return (
            !category.hidden &&
            <li key={i}><Category category={category} selectedCategory={selectedCategory} clickHandler={setSelectedCategory}/></li>
          )
        })}
      </ul>
      <Search searchTerm={searchTerm} handleSearchTermInput={handleSearchTermInput} />
      <ul className="products">
        {products.map((product: ProductType, i) => {
          return (
            product.is_for_sale &&
            <li className="product" key={i}>{renderProduct(product)}</li>
          )
        })}
      </ul>
    </>
  );
}

export default App;