import { screen, render } from '@testing-library/react';

import Product from '../../Components/Product';

const productMock = {
  id: 'id1',
  title: 'productTitle1',
  description: 'productDescription1',
  categories: [
    "category1",
    "category2"
  ]
}

describe('Product', () => {
  
  it('renders a product corrently', async () => {
    render(<Product selectedProduct='' product={productMock} handleClick={() => {}}/>);
    const renderedProduct = await screen.findByText(productMock.title);

    expect(renderedProduct).toHaveClass('product__button');
  });

  it('adds a selected class when it is selected', async () => {
    render(<Product selectedProduct='id1' product={productMock} handleClick={() => {}}/>);
    const renderedProduct = await screen.findByText(productMock.title);

    expect(renderedProduct).toHaveClass('selected');

  });

  it('displays the description when it is selected', async () => {
    render(<Product selectedProduct='id1' product={productMock} handleClick={() => {}}/>);
    const renderedProduct = await screen.findByTestId('product-description');

    expect(renderedProduct).toHaveClass('product__descriptiom');

  })
})