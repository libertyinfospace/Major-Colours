// Setup file for Jest
import '@testing-library/jest-dom';

// Mock Redux actions
jest.mock('../store/activeSlices', () => ({
  rankInfoActiveState: (payload) => ({
    type: 'rankInfoActiveState',
    payload
  }),
  rankCriteriaData: (payload) => ({
    type: 'rankCriteriaData',
    payload
  })
}));

// Mock window properties and methods
global.scrollTo = jest.fn();

// Mock DOM properties
Object.defineProperty(window, 'pageYOffset', {
  value: 0,
  writable: true
});

// Mock DOM methods
document.querySelectorAll = jest.fn();
document.querySelector = jest.fn(); 