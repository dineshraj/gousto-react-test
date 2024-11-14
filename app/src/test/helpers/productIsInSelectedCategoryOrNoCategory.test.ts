import productIsInSelectedCategoryOrNoCategory from '../../helpers/productIsInSelectedCategoryOrNoCategory';

const productCategories = [
  'category1',
  'category2',
  'category3'
];


describe('productIsInSelectedCategoryOrNoCategory', () => {
  it('returns true if the product is in a selected category', () => {
    const productIsInSelectedCategory = productIsInSelectedCategoryOrNoCategory(productCategories, 'category1');
    expect(productIsInSelectedCategory).toBe(true);
  })

  it('returns false if the product is not in a selected category', () => {
    const productIsInSelectedCategory = productIsInSelectedCategoryOrNoCategory(productCategories, 'category69');
    expect(productIsInSelectedCategory).toBe(false);
  })

  it('returns true if not category has been selected', () => {
    const productIsInSelectedCategory = productIsInSelectedCategoryOrNoCategory(productCategories, '');
    expect(productIsInSelectedCategory).toBe(true);
  })
});