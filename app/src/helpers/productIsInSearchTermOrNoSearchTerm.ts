const productIsInSearchTermOrNoSearchTerm = (productTitle: string, productDescription: string, searchTerm: string) => {
  const lowerCaseName = productTitle.toLowerCase();
  const lowerCaseDescription = productDescription.toLowerCase();
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  if (lowerCaseName.includes(lowerCaseSearchTerm) || lowerCaseDescription.includes(lowerCaseSearchTerm)) {
    return true;
  }
  return false;
};

export default productIsInSearchTermOrNoSearchTerm;