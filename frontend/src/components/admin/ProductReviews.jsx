import React, { useState, useEffect } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import {
  useDeleteReviewMutation,
  useLazyGetProductReviewsQuery,
} from "../../Redux/api/productsApi";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");

  const [getProductReviews, { data, isLoading, error }] =
    useLazyGetProductReviewsQuery();

  const [
    deleteReview,
    { error: deleteError, isLoading: isDeleteLoading, isSuccess },
  ] = useDeleteReviewMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success("Review Deleted");
    }
  }, [error, deleteError, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    getProductReviews(productId);
  };

  const deleteReviewHandler = (id) => {
    deleteReview({ productId, id });
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={"Product Reviews"} />

      <div className="row justify-content-center my-5">
        <div className="col-6">
          <form onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="productId_field" className="form-label">
                Enter Product ID
              </label>
              <input
                type="text"
                id="productId_field"
                className="form-control"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2">
              SEARCH
            </button>
          </form>
        </div>
      </div>

      {data?.reviews?.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Review ID</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>User</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.reviews?.map((review) => (
                <tr key={review?._id}>
                  <td>{review?._id}</td>
                  <td>{review?.rating}</td>
                  <td>{review?.comment}</td>
                  <td>{review?.user?.name}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteReviewHandler(review?._id)}
                      disabled={isDeleteLoading}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-5 text-center">No Reviews</p>
      )}
    </AdminLayout>
  );
};

export default ProductReviews;
