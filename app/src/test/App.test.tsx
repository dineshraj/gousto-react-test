import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

const mockCategories = {
  data: [
    {
      title:  'categoryOneTitle',
      description: 'categoryOneDescription',
      hidden: false
    },
    {
      title:  'categoryTwoTitle',
      description: 'categoryTwoDescription',
      hidden: false
    },
    {
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
      description: 'productDescription1'
    },
    {
      title: 'productTitle2',
      description: 'productDescription2'
    }
  ]
}

describe('App', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockCategories)
      } as unknown as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockProducts)
      } as unknown as Response)
  });

  afterEach(() => {
    jest.resetAllMocks();
  })

  describe('Categories', () => {
    
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
    it('fetches the product title and description correctly', async () => {
      render(<App />);
  
      const renderedProductOneTitle = await screen.findByText(mockProducts.data[0].title);
      const renderedProductOneDescription = await screen.findByText(mockProducts.data[0].description);
      const renderedProductTwoTitle = await screen.findByText(mockProducts.data[1].title);
      const renderedProductTwoDescription = await screen.findByText(mockProducts.data[1].description);

      expect(renderedProductOneTitle).toBeInTheDocument();
      expect(renderedProductOneDescription).toBeInTheDocument();
      expect(renderedProductTwoTitle).toBeInTheDocument();
      expect(renderedProductTwoDescription).toBeInTheDocument();
    });
  })

})