import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Layout from './ui/Layout.tsx'
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration } from 'react-router-dom'
import Product from './pages/Product.tsx'
import Category from './pages/Category.tsx'
import Cart from './pages/Cart.tsx'
import Profile from './pages/Profile.tsx'
import Favorite from './pages/Favorite.tsx'
import Orders from './pages/Orders.tsx'
import Success from './pages/Success.tsx'
import NotFound from './pages/NotFound.tsx'
import Cancel from './pages/Cancel.tsx'
import EditProfile from './ui/EditProfile.tsx'
import AddressPage from './ui/AddressPage.tsx'

const RouterLayout =()=>{
  return(
    <Layout>
      <ScrollRestoration/>
      <Outlet/>
    </Layout>
  )
}

const router = createBrowserRouter([{
  path:'/',
  element:<RouterLayout/>,
  children:[
    {
      path:'/',
      element: <App/>,
    },
    {
      path:'/product',
      element: <Product/>,
    },
    {
      path:'/product/:id',
      element: <Product/>,
    },
    {
      path:'/category',
      element: <Category/>,
    },
    {
      path:'/category/:id',
      element: <Category/>,
    },
    {
      path:'/cart',
      element: <Cart/>,
    },
    {
      path:'/profile',
      element: <Profile/>,
    },
    {
      path:'/edit-profile',
      element: <EditProfile/>,
    },
    {
      path:'/address',
      element: <AddressPage/>,
    },
    {
      path:'/favorite',
      element: <Favorite/>,
    },
    {
      path:'/orders',
      element: <Orders/>,
    },
    {
      path:'/success',
      element: <Success/>,
    },
    {
      path:'*',
      element: <NotFound/>,
    },
    {
      path:'/cancel',
      element: <Cancel/>,
    },
  ]
}])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
)
