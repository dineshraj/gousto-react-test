import { render, screen, waitFor } from '@testing-library/react';
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

const fetchMock = () => {
  jest.spyOn(global, 'fetch')
    .mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockCategories)
    } as unknown as Response)
    .mockResolvedValueOnce({
      ok: 'true',
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
      
      render(<App />);

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
      render(<App />);
  
      const renderedCategoryOneTitle = await screen.findByText(mockCategories.data[0].title);
      const renderedCategoryTwoTitle = await screen.findByText(mockCategories.data[1].title);
      
      expect(renderedCategoryOneTitle).toBeInTheDocument();
      expect(renderedCategoryTwoTitle).toBeInTheDocument();
    });
  
    it('does not display categories which are hidden', async () => {
      render(<App />);
      
      await waitFor(() => {
        const renderedCategoryTwoTitle = screen.queryByText(mockCategories.data[1].title);
        expect(renderedCategoryTwoTitle).toBeInTheDocument();
      });
  
      const renderedCategoryThreeTitle = screen.queryByText(mockCategories.data[2].title);
      expect(renderedCategoryThreeTitle).not.toBeInTheDocument();
    });
  });

  describe('Products', () => {

    beforeEach(() => {
      fetchMock();
    })

    it('fetches the product title correctly', async () => {
      render(<App />);
  
      const renderedProductOneTitle = await screen.findByText(mockProducts.data[0].title);
      const renderedProductTwoTitle = await screen.findByText(mockProducts.data[1].title);

      expect(renderedProductOneTitle).toBeInTheDocument();
      expect(renderedProductTwoTitle).toBeInTheDocument();
    });

    it('only displays the products of the selected category', async () => {
      render(<App />);
      const categoryButton = await screen.findByRole('button', { name: 'categoryOneTitle'});
      userEvent.click(categoryButton);

      await waitFor(() => {
        const renderedProductOneTitle = screen.queryByText(mockProducts.data[0].title);
        expect(renderedProductOneTitle).toBeInTheDocument();
      });
  
      const renderedProductTwoTitle = screen.queryByText(mockProducts.data[1].title);
      expect(renderedProductTwoTitle).not.toBeInTheDocument();
    });

    it.skip('clicking on a product displays the description', () => {

    });
  });

  describe.skip('Search', () => {
    it('only lists products that have been searched for', () => {

    });

    it('scopes the search within the selected category', () => {

    });
  })

})