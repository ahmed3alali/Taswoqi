import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage";
import toast, { Toaster } from 'react-hot-toast';
import ProductDetails from "./components/product/ProductDetails";
import LoginPage from "./components/auth/LoginPage";
import Register from "./components/auth/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UploadAvatar from "./components/user/UploadAvatar";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/PaymentMethod";
import MyOrders from "./components/orders/MyOrders";
import OrderDetails from "./components/orders/OrderDetails";
import Invoice from "./components/invoice/invoice";
import NewReview from "./components/reviews/NewReviews";
import Dashboard from "./components/admin/Dashboard";
import ListProducts from "./components/admin/ListProducts";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import UploadImages from "./components/admin/UploadImages";
import ListOrders from "./components/admin/ListOrders";
import ProcessOrder from "./components/admin/ProcessOrder";
import UpdateUser from "./components/admin/UpdateUser";
import ListUsers from "./components/admin/ListUsers";
import ProductReviews from "./components/admin/ProductReviews";
import NotFound from "./components/layout/NotFound";


function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <Header />

        

        <div className="container">
          <Routes> {/* ✅ Wrap all routes inside Routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/frontEndTest" element={<NewReview />} />
            <Route path="/me/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

            <Route path="/me/upload_avatar" element={
              <ProtectedRoute>
                <UploadAvatar />
              </ProtectedRoute>
            } />



<Route path="/admin/dashboard" element={
              <ProtectedRoute Admin={true}>
                <Dashboard />
              </ProtectedRoute>
            } />



<Route path="/admin/products" element={
              <ProtectedRoute Admin={true}>
           <ListProducts></ListProducts>
              </ProtectedRoute>
            } />


<Route path="/admin/products/:id/upload_images" element={
              <ProtectedRoute Admin={true}>
               <UploadImages></UploadImages>
              </ProtectedRoute>
            } />


<Route
        path="/admin/orders"
        element={
          <ProtectedRoute admin={true}>
            <ListOrders/>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/orders/:id"
        element={
          <ProtectedRoute admin={true}>
            <ProcessOrder />
          </ProtectedRoute>
        }
      />

<Route path="/admin/product/new" element={
              <ProtectedRoute Admin={true}>
                <NewProduct />
              </ProtectedRoute>
            } />






<Route path="/admin/products/:id" element={
              <ProtectedRoute Admin={true}>
                <UpdateProduct />
              </ProtectedRoute>
            } />



            

            <Route path="/me/update_password" element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            } />

            <Route path="/me/update_profile" element={<UpdateProfile />} />

            {/* ✅ Move /shipping route inside Routes */}
            <Route path="/shipping" element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            } />



<Route path="/confirm_order" element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            } />


<Route path="/payment_method" element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            } />


<Route path="/me/orders" element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            } />


<Route path="/me/order/:id" element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            } />



<Route path="/invoice/order/:id" element={
              <ProtectedRoute>
                <Invoice />
              </ProtectedRoute>
            } />



<Route
        path="/admin/users"
        element={
          <ProtectedRoute admin={true}>
            <ListUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users/:id"
        element={
          <ProtectedRoute admin={true}>
            <UpdateUser />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/reviews"
        element={
          <ProtectedRoute admin={true}>
            <ProductReviews/>
          </ProtectedRoute>
        }
      />



<Route path="*" element={<NotFound />} />

          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
