import productIsInSearchTermOrNoSearchTerm from '../../helpers/productIsInSearchTermOrNoSearchTerm';

const mockProducts = [
  {
    title: 'productTitle1',
    description: 'productDescription1',
    categories: [
      "category1",
      "category2"
    ]
  },
  {
    title: 'productTitle2',
    description: 'productDescription2',
    categories: [
      "category3",
      "category4"
    ]
  }
]

describe('productIsInSearchTermOrNoSearchTerm', () => {
  it('it returns true if the product name matches', () => {
    const productToBeDisplayed = productIsInSearchTermOrNoSearchTerm('productTitle1', 'productDescription1', 'itle1');
    expect(productToBeDisplayed).toBe(true);
  })

  it('it returns true if the product description matches', () => {
    const productToBeDisplayed = productIsInSearchTermOrNoSearchTerm('productTitle1', 'productDescription1', 'escription1');
    expect(productToBeDisplayed).toBe(true);
  })

  it('it returns false if the product should not be in the search results', () => {
    const productToBeDisplayed = productIsInSearchTermOrNoSearchTerm('productTitle1', 'productDescription1', 'itlfserfe');
    expect(productToBeDisplayed).toBe(false);
  })

  it('is able to match names with different cases', () => {
    const productToBeDisplayed = productIsInSearchTermOrNoSearchTerm('productTitle1', 'productDescription1', 'title1');
    expect(productToBeDisplayed).toBe(true);
  });
})