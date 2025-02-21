import React from "react";
import { useGetProductReviewsQuery } from "../../Redux/api/productsApi";
import { Spinner } from "react-bootstrap";

const ReviewsList = ({ productId }) => {
  const { data, isLoading, error } = useGetProductReviewsQuery(productId);

  if (isLoading) return <Spinner animation="border" />;
  if (error) return <p className="text-danger">Failed to load reviews.</p>;

  return (
    <div className="mt-4">
      <h4>Customer Reviews</h4>
      {data?.reviews?.length > 0 ? (
        data.reviews.map((review) => (
          <div key={review._id} className="border p-3 rounded mb-2">
            <strong>{review.user.name}</strong> - ⭐ {review.rating}/5
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewsList;
