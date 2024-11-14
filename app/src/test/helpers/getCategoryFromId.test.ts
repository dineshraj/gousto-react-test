import getCategoryTitleFromId from '../../helpers/getCategoryTitleFromId';

const categoryId = 'categoy1Id';
const categoriesMock = [
  {
    title: 'category1',
    hidden: false,
    id: 'categoy1Id',
  },
  {
    title: 'category2',
    hidden: false,
    id: 'categoy2Id',
  },
]

describe('getCategoryTitleFromId', () => {
  it('can find a category title if it is contained in the list of categories', () => {
    const categoryTitle = getCategoryTitleFromId(categoryId, categoriesMock);

    expect(categoryTitle).toBe('category1');
  });
});