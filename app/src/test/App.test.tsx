import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import App from '../App';

const mockCategories = {
  data: [
    {
      id: 'category1',
      title:  'categoryOneTitle',
      description: 'categoryOneDescription',
      hidden: false,
    },
    {
      id: 'category2',
      title:  'categoryTwoTitle',
      description: 'categoryTwoDescription',
      hidden: false
    },
    {
      id: 'category3',
      title:  'categoryThreeTitle',
      description: 'categoryThreeDescription',
      hidden: true
    }
  ]
};

const mockProducts = {
  data: [
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
}

const renderApp = () => (
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  )
);

const fetchMock = () => {
  jest.spyOn(global, 'fetch')
    .mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockCategories)
    } as unknown as Response)
    .mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockProducts)
    } as unknown as Response)
}

describe('App', () => {

  afterEach(() => {
    jest.resetAllMocks();
  })

  describe('Error handling', () => {
    it('handles errors when fetching data', async ()  => {
      const consoleLogSpy = jest.spyOn(console, 'log');
      jest.spyOn(global, 'fetch')
        .mockResolvedValueOnce({
          ok: false,
        } as unknown as Response);
      
      renderApp();

      await waitFor(() => {
        expect(consoleLogSpy).toBeCalledWith('Error fetching data');
      })
    })
  });

  describe('Categories', () => {

    beforeEach(() => {
      fetchMock();
    })

    it('fetches the category data correctly', async () => {
      renderApp();
  
      const renderedCategoryOneTitle = await screen.findByText(mockCategories.data[0].title);
      const renderedCategoryTwoTitle = await screen.findByText(mockCategories.data[1].title);
      
      expect(renderedCategoryOneTitle).toBeInTheDocument();
      expect(renderedCategoryTwoTitle).toBeInTheDocument();
    });
  
    it('does not display categories which are hidden', async () => {
      renderApp();
      
      await waitFor(() => {
        const renderedCategoryTwoTitle = screen.queryByText(mockCategories.data[1].title);
        expect(renderedCategoryTwoTitle).toBeInTheDocument();
      });
  
      const renderedCategoryThreeTitle = screen.queryByText(mockCategories.data[2].title);
      expect(renderedCategoryThreeTitle).not.toBeInTheDocument();
    });

    it('adds a selected class when clicking on a category', async () => {
      renderApp();

      const categoryLink = await screen.findByText(mockCategories.data[0].title);
      userEvent.click(categoryLink);

      expect(categoryLink).toHaveClass('selected');
    });

    it('changes the page title when a category is selected', async () => {
      renderApp();

      const categoryLink = await screen.findByText(mockCategories.data[0].title);
      userEvent.click(categoryLink);

      expect(document.title).toBe('categoryOneTitle');
    });
  });

  describe('Products', () => {

    beforeEach(() => {
      fetchMock();
    })

    it('fetches the product title correctly', async () => {
      renderApp();
  
      const renderedProductOneTitle = await screen.findByText(mockProducts.data[0].title);
      const renderedProductTwoTitle = await screen.findByText(mockProducts.data[1].title);

      expect(renderedProductOneTitle).toBeInTheDocument();
      expect(renderedProductTwoTitle).toBeInTheDocument();
    });

    it('only displays the products of the selected category', async () => {
      renderApp();
      const categoryLink = await screen.findByText(mockCategories.data[0].title);
      userEvent.click(categoryLink);

      const renderedProductOneTitle = await screen.findByText(mockProducts.data[0].title);
      expect(renderedProductOneTitle).toBeInTheDocument();

  
      const renderedProductTwoTitle = screen.queryByText(mockProducts.data[1].title);
      expect(renderedProductTwoTitle).not.toBeInTheDocument();
    });

    it('does not display product descriptions by default', async () => {
      renderApp();
  
      const renderedProductOneTitle = await screen.findByText(mockProducts.data[0].title);

      expect(renderedProductOneTitle).toBeInTheDocument();

      const renderedProductOneDescription = screen.queryByText(mockProducts.data[0].description);
      const renderedProductTwoDescription = screen.queryByText(mockProducts.data[1].description);
      expect(renderedProductOneDescription).not.toBeInTheDocument();
      expect(renderedProductTwoDescription).not.toBeInTheDocument();
    });

    it('clicking on a product displays the description', async () => {
      renderApp();

      const productButton = await screen.findByRole('button', { name: mockProducts.data[0].title});

      const renderedProductOneTitle = screen.queryByText(mockProducts.data[0].description);
      expect(renderedProductOneTitle).not.toBeInTheDocument();

      userEvent.click(productButton);

      const renderedProductOneDescription = screen.queryByText(mockProducts.data[0].description);
      expect(renderedProductOneDescription).toBeInTheDocument();
    });

    it('clicking on a product twices displays and then removes the description', async () => {
      renderApp();

      const productButton = await screen.findByRole('button', { name: mockProducts.data[0].title});

      const renderedProductOneTitle = screen.queryByText(mockProducts.data[0].description);
      expect(renderedProductOneTitle).not.toBeInTheDocument();

      userEvent.click(productButton);

      const renderedProductOneDescription = screen.queryByText(mockProducts.data[0].description);
      expect(renderedProductOneDescription).toBeInTheDocument();

      userEvent.click(productButton);
      expect(renderedProductOneDescription).not.toBeInTheDocument();
    });

    it('adds a selected class when clicking on a product', async () => {
      renderApp();

      const productButton = await screen.findByRole('button', { name: mockProducts.data[0].title});
      userEvent.click(productButton);
      
      expect(productButton).toHaveClass('selected');
    });
  });

  describe('Search', () => {
    beforeEach(() => {
      fetchMock();
    })

    it('only lists products that have been searched for', async () => {
      renderApp();

      const searchInput = await screen.findByTestId('search');
      
      const renderedProductOneTitle = await screen.findByText(mockProducts.data[0].title);
      const renderedProductTwoTitle = screen.queryByText(mockProducts.data[1].title);
      
      expect(renderedProductOneTitle).toBeInTheDocument();
      expect(renderedProductTwoTitle).toBeInTheDocument();
      
      fireEvent.change(searchInput, {target: { value: 'title1' }})
screen.debug()
      expect(renderedProductOneTitle).toBeInTheDocument();
      expect(renderedProductTwoTitle).not.toBeInTheDocument();
    });

    it('scopes the search within the selected category', async () => {
      renderApp();

      const searchInput = await screen.findByTestId('search');

      const renderedProductOneTitle = await screen.findByText(mockProducts.data[0].title);
      const renderedProductTwoTitle = screen.queryByText(mockProducts.data[1].title);

      expect(renderedProductOneTitle).toBeInTheDocument();
      expect(renderedProductTwoTitle).toBeInTheDocument();

      const categoryLink = await screen.findByText(mockCategories.data[0].title);
      userEvent.click(categoryLink);

      fireEvent.change(searchInput, {target: { value: 'product' }})

      expect(renderedProductOneTitle).toBeInTheDocument();
      expect(renderedProductTwoTitle).not.toBeInTheDocument();
    });
  })
})
