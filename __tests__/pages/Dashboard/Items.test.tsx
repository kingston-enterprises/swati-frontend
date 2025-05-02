import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import configureStore from 'redux-mock-store';
import Items from '../../../src/pages/dashboard/Items';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]); // ✅ thunk passed as a middleware
 
// Mock custom hooks/components
vi.mock('../../../hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

vi.mock('../../../components/custom/ItemsGrid', () => ({
  default: ({ data }: any) => <div>Mock ItemsGrid with {data.length} items</div>,
}));

vi.mock('../../../components/custom/CustomDialog', () => ({
  CustomDialog: () => <div>Mock CustomDialog</div>,
}));

vi.mock('../../../components/custom/Loader', () => ({
  default: () => <div>Loading...</div>,
}));

// Redux actions
vi.mock('../../../features/items/itemSlice', () => ({
  getUserItemsWithPagination: () => () => Promise.resolve({ payload: [] }),
  createItem: vi.fn(),
  updateItem: vi.fn(),
}));


const renderComponent = (initialState = {}) => {
  const store = mockStore({
    auth: {
      user: { _id: 'user1' },
    },
    item: {
      data: [],
      message: '',
      isLoading: false,
      isError: false,
      ...initialState,
    },
  });

  return render(
    <Provider store={store}>
      <Items />
    </Provider>
  );
};

describe('Items Page', () => {
  it('renders header and button', () => {
    renderComponent();

    expect(screen.getByText('Items')).toBeInTheDocument();
    expect(screen.getByText('Add Item')).toBeInTheDocument();
  });

  it('renders loader when loading', () => {
    renderComponent({ isLoading: true });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders items grid when not loading', () => {
    renderComponent({ data: [{ _id: '1' }, { _id: '2' }] });

    expect(screen.getByText(/Mock ItemsGrid with 2 items/i)).toBeInTheDocument();
  });

  it('opens the dialog when "Add Item" is clicked', async () => {
    renderComponent();

    fireEvent.click(screen.getByText(/Add Item/i));
    await waitFor(() => {
      expect(screen.getByText('Mock CustomDialog')).toBeInTheDocument();
    });
  });
});

