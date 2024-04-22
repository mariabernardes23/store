import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Produto } from "./pages/produto";
import { Favoritos } from "./pages/favoritos";
import { Login } from "./pages/login";
import { Notfound } from "./pages/notfound";
import { Private } from "./routes/private";
import { Profile } from "./pages/profile";
import { UserProvider } from "./context/UserContex";
import { Cart } from "./pages/cart";
import { CartProvider } from "./context/CartContext";

const router = createBrowserRouter([
    {
        element: <CartProvider> <Layout /> </CartProvider>,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/produto/:id',
                element: <Private> <CartProvider> <Produto /> </CartProvider> </Private>
            },
            {
                path: '/favoritos',
                element: <Favoritos />,
            },
            {
                path: '/cart',
                element: <Private> <CartProvider> <Cart /> </CartProvider> </Private>,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '*',
                element: <Notfound />
            }
        ]
    }
])

export { router}