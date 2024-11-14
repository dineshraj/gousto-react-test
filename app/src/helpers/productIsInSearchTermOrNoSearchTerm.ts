const productIsInSearchTermOrNoSearchTerm = (productTitle: string, searchTerm: string) => {
  const lowerCaseName = productTitle.toLowerCase();
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  if (lowerCaseName.includes(lowerCaseSearchTerm)) {
    return true;
  }
  return false;
};

export default productIsInSearchTermOrNoSearchTerm;