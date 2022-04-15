import {rest} from "msw";
import {setupServer} from "msw/node";
import { renderHook, act } from '@testing-library/react-hooks'
import { screen } from '@testing-library/react';
import useCart from "../../hooks/useCart";
import Cart from "../../components/Cart";
import ReactDOM from "react-dom";

const server = setupServer(
    rest.get(
        "http://localhost:8000/api/cart",
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
    rest.delete(
        "http://localhost:8000/api/cart/3",
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
    );

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

let container: any;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

const req = {
    image: "",
    name: "Rick",
    quantity: 10
};

test("Component Cart", async () => {
    act(() => {
        ReactDOM.render(<Cart setRoute={() => {}} />, container);
    })
    screen.getByText(/Retour/i)
});

test("load cart", async () => {
    const {result} = renderHook(() => useCart());
    const {loading, loadCart} = result.current;
    expect(loading).toEqual(true);
    await act(async () => {
        await loadCart()
    });
    const {products} = result.current;
    console.log(products);
})

test("Remove from cart", async () => {
    const {result} = renderHook(() => useCart());
    const {loading, removeToCart} = result.current;
    await act(async () => {
        await removeToCart({
            id: 3,
            name: 'Summer Smith',
            price: '15',
            quantity: 5,
            image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg'
        })
    });
    expect(loading).toEqual(true);
    const {products} = result.current;
    console.log(products);
})

