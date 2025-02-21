import React, { useEffect, useState } from "react";
import MetaData from "./layout/MetaData.jsx";
import { useGetProductsQuery } from "../Redux/api/productsApi.js";
import ProductItem from "./product/ProductItem.jsx";
import Loader from "./layout/Loader.jsx";
import toast from "react-hot-toast";
import CustomPagination from "./layout/CustomPagnation.jsx";
import { useSearchParams } from "react-router-dom";
import Filters from "./layout/Filters.jsx";
import ProductCard from "./product/ProductCard.jsx";
import Welcome from "./WelcomeHero/Welcome.jsx";

const Homepage = () => {
  const [currentPage, setCurrentPage] = useState(1);
let [searchParams] = useSearchParams();
  // Pass currentPage as a parameter to RTK Query


const keyword = searchParams.get("keyword") || ""
const min = searchParams.get("min");
const max = searchParams.get("max");


const page = searchParams.get("page") ||1
const category = searchParams.get("category") || "";  // ✅ New
const ratings = searchParams.get("ratings") || ""
const params = {page, keyword}
min !==null && (params.min=min)
max!==null && (params.max=max)

  const { data, isLoading, error, isError } = useGetProductsQuery({ page: currentPage , keyword:keyword, min, max, category, ratings});

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  const coloumnSize = keyword ? 3 : 4

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"Buy best products online"} />



      <div className="container mt-5">
       
        <div className="row">


          {keyword && (

<div className="col-md-3 mt-5"> 
<Filters/>




</div>


          )}




          <div className={keyword? "col-md-9": "col-md-12"}>
          {!keyword && !min && !max && !category && !ratings && <Welcome />}
            <h1 id="products_heading" className="text-secondary">{keyword?`${data?.products?.length} Matching Results` :`Latest Products`}</h1>

            <section id="products" className="mt-5">
              <div className="row">
                {data?.products?.map((product) => (
                  
                  <ProductCard key={product._id} product={product} columnSize={coloumnSize} />
                ))}
              </div>
            </section>

            {data?.filteredProductsCount > 0 ? (
              <CustomPagination
                resPerPage={data.resPerPage}
                filteredProductsCount={data.filteredProductsCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage} // Pass function to update page (Pagination comming commpone component)
              />
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
