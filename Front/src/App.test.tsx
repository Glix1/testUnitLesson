import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { waitFor } from '@testing-library/react';

// let container: any;

// beforeEach(() => {
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });

// test('Ajouter au panier', async () => {
//   act(() => {
//     ReactDOM.render(<App />, container);
//   });
//   await waitFor(() => {
//     expect(screen.queryAllByText('<div>Loading....</div>')).not.toBeInTheDocument()
//   });
  
//   const rickItem = screen.getByText(/Rick Sanchez/i);
//   act(() => {
//     rickItem.dispatchEvent(new MouseEvent("click", { bubbles: true }))
//   });
// });

// test('Accéder au panier', () => {
//   act(() => {
//     ReactDOM.render(<App />, container);
//   });
//   const panier = screen.getAllByText(/Aller sur panier/i);
//   // act(() => {
//   //   panier.dispatchEvent(new MouseEvent("click", { bubbles: true }))
//   // });
//   expect(screen.getByText(/Retour/i)).toBeInTheDocument();
// });

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Aller sur panier/i);
  expect(linkElement).toBeInTheDocument();
});