import { Product as ProductType } from "../types";

interface ProductProps {
  selectedProduct: string;
  product: ProductType;
  handleClick: Function;
}

const Product = ({ selectedProduct, product, handleClick}: ProductProps) => {
  const productClass = selectedProduct === product.id ? 'product__button selected' : 'product__button';
  const descriptionClass = selectedProduct !== product.id ? 'product__description hidden' : 'product__description';
  return (
    <>
      <button 
        className={productClass}
        onClick={() => handleClick(product.id)}>
          {product.title}
      </button>
      <p data-testid="product-description" className={descriptionClass}>{product.description}</p>
    </>
  )
};

export default Product;