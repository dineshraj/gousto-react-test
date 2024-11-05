import { Product as ProductType } from "../types";

interface ProductProps {
  selectedProduct: string;
  product: ProductType;
  handleClick: Function;
}

const Product = ({ selectedProduct, product, handleClick}: ProductProps) => {
  return (
    <li className="product">
      <button 
        className={`product__button${(selectedProduct === product.id) ? ' selected' : ''}`}
        onClick={() => handleClick(product.id)}>
          {product.title}
      </button>
      {selectedProduct === product.id && <p className="product__descriptiom">{product.description}</p>}
    </li>
  )
};

export default Product;