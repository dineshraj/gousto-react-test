import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Category from '../../Components/Category';

const categoryMock = {
  id: 'category1',
  title:  'categoryOneTitle',
  description: 'categoryOneDescription',
  hidden: false
}

describe('Category', () => {
  
  it('renders a category corrently', async () => {
    render(
      <MemoryRouter>
        <Category selectedCategory='' category={categoryMock} clickHandler={() => {}}/>
      </MemoryRouter>
    );
    const renderedProduct = await screen.findByText(categoryMock.title);

    expect(renderedProduct).toHaveClass('category__link');
  });

  it('adds a selected class when it is selected', async () => {
    render(
      <MemoryRouter>
        <Category selectedCategory='category1' category={categoryMock} clickHandler={() => {}}/>
      </MemoryRouter>
    );

    const renderedProduct = await screen.findByText(categoryMock.title);

    expect(renderedProduct).toHaveClass('selected');
  });
});