const productIsInSelectedCategoryOrNoCategory = (productCategories: Array<string>, selectedCategory: string) => {
  if (productCategories.includes(selectedCategory) || selectedCategory === '') {
    return true;
  }
  return false;
}

export default productIsInSelectedCategoryOrNoCategory;