import React from 'react'
import "../product/ProductCard.css"
import { Link } from 'react-router-dom'
import { setCartItem } from "../../Redux/features/cartSlice";
import { useDispatch } from 'react-redux';
const ProductCard = ({ product, columnSize }) => {


    const dispatch = useDispatch();
    const setItemToCart = () => {
        const cartItem = {
            product: product?._id,
            name: product?.name,
            price: product?.price,
            image: product?.images[0]?.url,
            stock: product?.stock,
            quantity: 1,
        };

        dispatch(setCartItem(cartItem));
    };


    return (
        <div className={`col-md-6 col-lg-${columnSize} col-xl-3`}>
            <section className="section-products">
                <div className="container">
                    <div id="product-1" className="single-product">
                        <div className="part-1">
                            <img
                                src={product?.images[0]?.url}
                                alt={product?.name}
                                className="product-image"
                            />

                            <ul>
                                <li><a href="#" disabled={product.stock <= 0}
                                    onClick={setItemToCart}><i className="fas fa-shopping-cart"></i></a></li>


                                <li><Link to={`/product/${product?._id}`}><i className="fas fa-expand">

                                </i></Link></li>
                            </ul>
                        </div>
                        <div className=" part-2">


                            <div className='title'>

                                <h3 className="product-title">
                                    <Link to={`/product/${product?._id}`}>{product?.name}</Link>
                                </h3>
                            </div>

                            <div className="ratings">

                                <div class="d-flex flex-row user-ratings">
                                    <div class="ratings">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </div>
                                    <h6 class="text-muted ml-1">{product?.ratings || 0}</h6>
                                </div>

                            </div>


                            <h4 className="product-price">{product?.price}</h4>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProductCard
