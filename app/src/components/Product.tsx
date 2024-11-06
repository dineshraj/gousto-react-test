import { Product as ProductType } from "../types";

interface ProductProps {
  selectedProduct: string;
  product: ProductType;
  handleClick: Function;
}

const Product = ({ selectedProduct, product, handleClick}: ProductProps) => {
  const productClass = selectedProduct === product.id ? 'product__button selected' : 'product__button';

  return (
    <>
      <button 
        className={productClass}
        onClick={() => handleClick(product.id)}>
          {product.title}
      </button>
      {selectedProduct === product.id && <p data-testid="product-description" className="product__descriptiom">{product.description}</p>}
    </>
  )
};

export default Product;