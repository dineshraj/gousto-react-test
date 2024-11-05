import { screen, render } from '@testing-library/react';

import Search from '../../Components/Search';

describe('Search', () => {
  render(<Search searchTerm='search term' handleSearchTermInput={() => {}}/>);

  it('renders correctly', async () => {
    const searchInput = await screen.findByTestId('search');

    expect(searchInput).toHaveClass('search');
    expect(searchInput).toHaveValue('search term');
  });
})