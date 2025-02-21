import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useCanUserReviewQuery, useSubmitReviewMutation } from "../../Redux/api/productsApi";
import { Form, Button } from "react-bootstrap";

const NewReviews = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [submitReview, { isLoading, error, isSuccess }] = useSubmitReviewMutation();
  const { data } = useCanUserReviewQuery(productId);
  const canReview = data?.canReview;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Review Posted");
      setRating(0);
      setComment("");
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    submitReview({ rating, comment, productId });
  };

  return (
    <div className="container mt-4">
      <h4>Submit Your Rating</h4>
      {canReview ? (
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as="select"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              disabled={isLoading}
            >
              <option value={0}>Select...</option>
              <option value={1}>1 - Poor</option>
              <option value={2}>2 - Fair</option>
              <option value={3}>3 - Good</option>
              <option value={4}>4 - Very Good</option>
              <option value={5}>5 - Excellent</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review here..."
              disabled={isLoading}
            />
          </Form.Group>

          <Button
            className="mt-3"
            variant="primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Review"}
          </Button>
        </Form>
      ) : (
        <p className="text-muted">You cannot review this product.</p>
      )}
    </div>
  );
};

export default NewReviews;
