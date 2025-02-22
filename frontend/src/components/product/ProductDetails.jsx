import React, { useEffect, useState } from "react";
import { useGetProductsDetailsQuery } from "../../Redux/api/productsApi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";

import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "../../Redux/features/cartSlice";
import NewReview from "../reviews/NewReviews";
import ReviewsList from "../reviews/ReviewsList";
import NotFound from "../layout/NotFound";

const ProductDetails = () => {



  const params = useParams();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState("");

  const { data, isLoading, error, isError } = useGetProductsDetailsQuery(
    params?.id
  );
  const product = data?.product;

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    setActiveImg(
      product?.images[0] ? product?.images[0]?.url : "/images/default_product.img"
    );
  }, [product]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError,error?.data?.message]);

  const increaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber >= product?.stock) return;
    setQuantity(count.valueAsNumber + 1);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");
    if (count.valueAsNumber <= 1) return;
    setQuantity(count.valueAsNumber - 1);
  };

  const setItemToCart = () => {
    const cartItem = {
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0]?.url,
      stock: product?.stock,
      quantity,
    };

    dispatch(setCartItem(cartItem));
  };

  if (isLoading) return <Loader />;


  if (isLoading) return <Loader />;
  if ((!product || Object.keys(product).length === 0) && !isLoading) {
    return <NotFound />;
  }

  return (
    <div className="row d-flex justify-content-around">
      {/* Product Image Section */}
     
      <div className="col-12 col-lg-5 img-fluid">
        <div className="p-3">
          <img
            className="d-block w-100"
            src={activeImg}
            alt={product?.name}
            width="100"
            height="100"
          />
        </div>
        <div className="row justify-content-start mt-5">
          {product?.images?.map((img, index) => (
            <div key={index} className="col-2 ms-4 mt-2">
              <img
                className={`d-block border rounded p-3 cursor-pointer ${
                  img.url === activeImg ? "border-warning" : ""
                }`}
                height="100"
                width="100"
                src={img?.url}
                alt={img?.url}
                onClick={() => setActiveImg(img.url)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="col-12 col-lg-5 mt-5">
        <h3>{product?.name}</h3>
        <p id="product_id">{product?._id}</p>
        <hr />

        <div className="d-flex">
        
          <span id="no-of-reviews" className="pt-1 ps-2">
            ({product?.numOfReviews} Reviews)
          </span>
        </div>
        <hr />

        <p id="product_price">${product?.price}</p>
        <div className="stockCounter d-inline">
          <button className="btn btn-danger" onClick={decreaseQty}>
            -
          </button>
          <input
            type="number"
            className="form-control count d-inline"
            value={quantity}
            readOnly
          />
          <button className="btn btn-primary" onClick={increaseQty}>
            +
          </button>
        </div>
        <button
          type="button"
          id="cart_btn"
          className="btn btn-primary d-inline ms-4"
          disabled={product?.stock <= 0}
          onClick={setItemToCart}
        >
          Add to Cart
        </button>

        <hr />
        <p>
          Status:{" "}
          <span
            id="stock_status"
            className={product?.stock > 0 ? "text-success" : "text-danger"}
          >
            {product?.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </p>

        <hr />
        <h4 className="mt-2">Description:</h4>
        <p>{product?.description}</p>
        <hr />
        <p id="product_seller mb-3">
          Sold by: <strong>{product?.seller}</strong>
        </p>

        {isAuthenticated ? (
          <NewReview productId={product?._id} />
        ) : (
          <div className="alert alert-danger my-5">Login to post your review.</div>
        )}


<ReviewsList productId={product?._id}></ReviewsList>

      </div>
    </div>
  );
};

export default ProductDetails;
