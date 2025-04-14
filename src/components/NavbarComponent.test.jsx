import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import NavbarComponent from './NavbarComponent';
import activeSlices from '../store/activeSlices';
import { MemoryRouter } from 'react-router-dom';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// Mock the CommingSoonComponent
vi.mock('./CommingSoonComponent', () => ({
  default: () => <div data-testid="coming-soon">Coming Soon</div>
}));

// Mock the FaCartPlus icon
vi.mock('react-icons/fa6', () => ({
  FaCartPlus: () => <div data-testid="cart-icon">Cart Icon</div>
}));

// Mock the FaBars and FaTimes icons
vi.mock('react-icons/fa', () => ({
  FaBars: () => <div data-testid="bars-icon">Menu Icon</div>,
  FaTimes: () => <div data-testid="times-icon">Close Icon</div>
}));

// Mock the logo
vi.mock('../assets/img/MAJOR COLOURS-LOGO.png', () => 'mocked-logo-path');

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

// Helper function to create a test store
const createTestStore = (initialState = { commingSoonActive: false }) => {
  return configureStore({
    reducer: {
      active: activeSlices
    },
    preloadedState: {
      active: {
        commingSoonActive: initialState.commingSoonActive
      }
    }
  });
};

// Mock the Redux store and reducers
const mockStore = configureStore({
  reducer: {
    active: (state = { commingSoonActive: false }, action) => {
      switch (action.type) {
        case 'active/commingSoonActive':
          return { ...state, commingSoonActive: action.payload };
        case 'active/toggleCart':
          return { ...state, cartActive: action.payload };
        default:
          return state;
      }
    }
  }
});

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}));

describe('NavbarComponent', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    
    // Mock window.innerWidth to test responsive behavior
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024 // Default to desktop view
    });
    
    // Mock matchMedia for responsive testing
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }));
  });

  const renderNavbar = (initialState = { commingSoonActive: false }) => {
    return render(
      <Provider store={createTestStore(initialState)}>
        <BrowserRouter>
          <NavbarComponent />
        </BrowserRouter>
      </Provider>
    );
  };

  it('renders the logo correctly', () => {
    renderNavbar();
    
    const logoImage = screen.getByAltText('MAJOR-COLOURS');
    expect(logoImage).toBeInTheDocument();
  });

  it('shows sports navigation items on all screen sizes', () => {
    renderNavbar();
    
    expect(screen.getByText('WEIGHTLIFTING')).toBeInTheDocument();
    expect(screen.getByText('CRICKET')).toBeInTheDocument();
    expect(screen.getByText('FOOTBALL')).toBeInTheDocument();
    expect(screen.getByText('BASKETBALL')).toBeInTheDocument();
  });

  it('shows user navigation items on desktop', () => {
    renderNavbar();
    
    expect(screen.getByText('Membership')).toBeInTheDocument();
    expect(screen.getByText('Dressing Room')).toBeInTheDocument();
    expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
  });

  it('shows hamburger menu icon on mobile', () => {
    // Mock mobile viewport
    window.innerWidth = 500;
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query.includes('max-width: 600px'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }));
    
    const { container } = renderNavbar();
    
    // Check for hamburger icon
    expect(screen.getByTestId('bars-icon')).toBeInTheDocument();
    
    // Mobile menu should be hidden initially
    const mobileMenu = container.querySelector('.fixed.top-0.right-0.h-full');
    expect(mobileMenu).toHaveClass('translate-x-full');
  });

  it('toggles mobile menu when hamburger icon is clicked', () => {
    // Mock mobile viewport
    window.innerWidth = 500;
    
    const { container } = renderNavbar();
    
    // Click the hamburger button
    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);
    
    // Mobile menu should be visible
    const mobileMenu = container.querySelector('.fixed.top-0.right-0.h-full');
    expect(mobileMenu).toHaveClass('translate-x-0');
    
    // Close button should be visible
    expect(screen.getByTestId('times-icon')).toBeInTheDocument();
    
    // Click again to close
    fireEvent.click(menuButton);
    
    // Mobile menu should be hidden
    expect(mobileMenu).toHaveClass('translate-x-full');
  });

  it('navigates to login page when Membership is clicked', () => {
    renderNavbar();
    
    const membershipLink = screen.getByText('Membership');
    fireEvent.click(membershipLink);
    
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('shows coming soon component when hovering CRICKET', () => {
    renderNavbar();
    
    const cricketLink = screen.getByText('CRICKET');
    fireEvent.mouseEnter(cricketLink);
    
    // ComingSoonComponent should be visible
    expect(screen.getByTestId('coming-soon')).toBeInTheDocument();
    
    // Mouse leave should hide it
    fireEvent.mouseLeave(cricketLink);
  });

  it('has 80% width and left-aligned content in mobile menu with dividers', () => {
    // Mock mobile viewport
    window.innerWidth = 500;
    
    const { container } = renderNavbar();
    
    // Open mobile menu
    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);
    
    // Check that menu items are present
    expect(screen.getByText('Membership')).toBeInTheDocument();
    expect(screen.getByText('Dressing Room')).toBeInTheDocument();
    expect(screen.getByText('Cart (0)')).toBeInTheDocument();
    
    // Check for left alignment
    const menuContainer = container.querySelector('.flex.flex-col.h-full.items-start');
    expect(menuContainer).toBeInTheDocument();
    
    // Check for 80% width
    const mobileMenu = container.querySelector('.fixed.top-0.right-0.h-full');
    expect(mobileMenu).toHaveClass('w-4/5');
    
    // Check that there are horizontal dividers
    const dividers = container.querySelectorAll('.border-t.border-gray-700');
    expect(dividers.length).toBe(2); // One less than the number of items
    
    // Check text alignment is left
    const menuItems = container.querySelectorAll('.text-left');
    expect(menuItems.length).toBe(3); // Same as number of menu items
  });

  it('has a horizontally scrollable sports navigation', () => {
    // Mobile viewport
    window.innerWidth = 500;
    
    const { container } = renderNavbar();
    
    // Sports items should still be visible on mobile
    expect(screen.getByText('WEIGHTLIFTING')).toBeInTheDocument();
    expect(screen.getByText('CRICKET')).toBeInTheDocument();
    expect(screen.getByText('FOOTBALL')).toBeInTheDocument();
    expect(screen.getByText('BASKETBALL')).toBeInTheDocument();
    
    // Check for the scrollable container
    const scrollableContainer = container.querySelector('.overflow-x-auto.hide-scrollbar');
    expect(scrollableContainer).toBeTruthy();
  });

  it('has a unified navbar structure with no gaps', () => {
    const { container } = renderNavbar();
    
    // Check that we have a main wrapper div
    const mainWrapper = container.querySelector('.w-full.bg-backgroundColor.fixed.top-0.left-0');
    expect(mainWrapper).toBeTruthy();
    
    // Check that sports section is directly inside the main wrapper
    const sportsSection = mainWrapper.querySelector('.w-full.bg-backgroundColor');
    expect(sportsSection).toBeTruthy();
  });
  
  it('positions ComingSoonComponent centered at the bottom of the sports section', () => {
    const { container } = renderNavbar();
    
    // Hover to show ComingSoon
    const cricketLink = screen.getByText('CRICKET');
    fireEvent.mouseEnter(cricketLink);
    
    // ComingSoonComponent should be visible
    const comingSoon = screen.getByTestId('coming-soon');
    expect(comingSoon).toBeInTheDocument();
    
    // Check for the positioning - centered and at the bottom
    const comingSoonContainer = comingSoon.closest('.absolute');
    expect(comingSoonContainer).toHaveClass('top-[44px]');
    expect(comingSoonContainer).toHaveClass('-mt-[1px]');
    expect(comingSoonContainer).toHaveClass('left-1/2');
    expect(comingSoonContainer).toHaveClass('transform');
    expect(comingSoonContainer).toHaveClass('-translate-x-1/2');
    
    // Sports container should have position relative
    const sportsContainer = container.querySelector('.w-full.bg-backgroundColor.relative');
    expect(sportsContainer).toBeTruthy();
  });

  it("should show ComingSoonComponent only when hovering non-active sports items", () => {
    render(
      <Provider store={createTestStore()}>
        <MemoryRouter>
          <NavbarComponent />
        </MemoryRouter>
      </Provider>
    );
    
    // Find the active sports item (WEIGHTLIFTING)
    const activeLink = screen.getByText("WEIGHTLIFTING");
    fireEvent.mouseEnter(activeLink);
    
    // ComingSoonComponent should not appear for active item
    expect(screen.queryByTestId("coming-soon")).not.toBeInTheDocument();
    
    // Find a non-active sports item (CRICKET)
    const nonActiveLink = screen.getByText("CRICKET");
    fireEvent.mouseEnter(nonActiveLink);
    
    // ComingSoonComponent should appear for non-active item
    const comingSoonElement = screen.getByTestId("coming-soon");
    expect(comingSoonElement).toBeInTheDocument();
    
    // Mouse leave should hide the component
    fireEvent.mouseLeave(nonActiveLink);
    expect(screen.queryByTestId("coming-soon")).not.toBeInTheDocument();
  });

  test('when mobile menu is open in mobile view, it should show user and sports navigation items', async () => {
    store = createTestStore();
    global.innerWidth = 500;
    const {getByRole, queryByText, getByText} = render(
      <Provider store={store}>
        <Router>
          <NavbarComponent />
        </Router>
      </Provider>
    );

    const menuButton = getByRole('button', {name: 'open menu'});
    await userEvent.click(menuButton);

    // Check user navigation items
    expect(getByText('Membership')).toBeInTheDocument();
    expect(getByText('Dressing Room')).toBeInTheDocument();
    expect(getByText('Cart (0)')).toBeInTheDocument();

    // Check sports navigation items
    expect(getByText('CRICKET')).toBeInTheDocument();
    expect(getByText('FOOTBALL')).toBeInTheDocument();
    expect(getByText('RUGBY')).toBeInTheDocument();
    expect(getByText('TENNIS')).toBeInTheDocument();

    // Check for Sports heading
    expect(getByText('Sports')).toBeInTheDocument();

    // Check for divider between sections
    const dividers = document.querySelectorAll('.border-t.border-gray-700');
    expect(dividers.length).toBeGreaterThan(0);
  });

  test('navigates to cart page when cart icon is clicked in mobile menu', () => {
    renderNavbar();
    
    // Open the hamburger menu
    const menuButton = screen.getByLabelText('Toggle menu');
    fireEvent.click(menuButton);
    
    // Find and click the cart item in the mobile menu
    const cartItem = screen.getByText('Cart (0)');
    fireEvent.click(cartItem);
    
    // Check if navigation was called with the correct path
    expect(mockedNavigate).toHaveBeenCalledWith('/cart');
  });

  test('navigates to cart page when cart icon is clicked in desktop menu', () => {
    renderNavbar();
    
    // Find the cart item in desktop menu (might need to adjust this selector)
    // Desktop UI is hidden by default, so we need to first make it visible
    const desktopMenu = document.querySelector('.hidden.sm\\:block');
    if (desktopMenu) {
      // Make it visible for testing
      desktopMenu.classList.remove('hidden');
      desktopMenu.classList.add('block');
    }
    
    // Now find and click the cart icon in desktop menu
    const cartItemInDesktop = screen.getAllByRole('listitem').find(
      item => item.textContent === '0' // Desktop cart shows just the number
    );
    
    fireEvent.click(cartItemInDesktop);
    
    // Check if navigation was called with the correct path
    expect(mockedNavigate).toHaveBeenCalledWith('/cart');
  });
}); 