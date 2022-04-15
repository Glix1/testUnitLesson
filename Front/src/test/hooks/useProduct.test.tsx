import {rest} from "msw";
import {setupServer} from "msw/node";
import ReactDOM from "react-dom";
import { screen } from '@testing-library/react';

import { renderHook, act } from '@testing-library/react-hooks'
import useProduct from "../../hooks/useProduct";
import Product from "../../components/Product";

const server = setupServer(
    rest.post(
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


test('Test component Product', async () => {
    act(() => {
        ReactDOM.render(<Product setRoute={() => {}} data={{
            image: "",
            name: "Rick",
            quantity: 10
        }} />, container);
    });
    screen.getByText(/Figurine de Rick/i);
});

test("load cart", async () => {
    const {result} = renderHook(() => useProduct({
        id: 3,
        name: 'Summer Smith',
        price: '15',
        quantity: 5,
        image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg'
    }));
    const {loading, addProduct} = result.current;
    expect(loading).toEqual(false);
    await act(async () => {
        await addProduct()
    });
    //const {products} = result.current;
    console.log(result.current);
})