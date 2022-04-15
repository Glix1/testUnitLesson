import {rest} from "msw";
import {setupServer} from "msw/node";
import ReactDOM from "react-dom";
import { screen } from '@testing-library/react';

import { renderHook, act } from '@testing-library/react-hooks'
import useHome from "../../hooks/useHome";
import Home from "../../components/Home";

const server = setupServer(
    rest.get(
        "http://localhost:8000/api/products",
        (req, res, ctx) => {
            return res(
                ctx.json({
                    products: [{
                        id: 3,
                        name: 'Summer Smith',
                        price: '15',
                        quantity: 5,
                        image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg'
                    },
                        {
                            id: 15,
                            name: 'Alien Rick',
                            price: '20',
                            quantity: 20,
                            image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg'
                        },
                        {
                            id: 15,
                            name: 'Alien Rick',
                            price: '20',
                            quantity: 20,
                            image: 'https://rickandmortyapi.com/api/character/avatar/15.jpeg'
                        }
                ]}))}),
    // remove
    );

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

let container: any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

test("Test component Home", async() => {
    act(() => {
        ReactDOM.render(<Home setRoute={() => {}} />, container);
    })
    screen.getByText(/Aller sur panier/i)
});

test("load home", async () => {
    const {result} = renderHook(() => useHome());
    const {loading, loadProducts} = result.current;
    expect(loading).toEqual(true);
    await act(async () => {
        await loadProducts()
    });
    const {products} = result.current;
    console.log(products);
})