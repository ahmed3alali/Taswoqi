import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useMyOrdersQuery } from "../../Redux/api/orderApi";

const MyOrders = () => {
  const { data, isLoading, error } = useMyOrdersQuery();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderSuccess = searchParams.get("order_success");

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (orderSuccess) {
      navigate("/me/orders");
    }
  }, [error, orderSuccess]);

  if (isLoading) return <Loader />;

  return (
    <div className="container">
      <MetaData title={"My Orders"} />
      <h1 className="my-5">{data?.orders?.length} Orders</h1>

      <Table striped bordered hover responsive className="text-center">
        <thead className="bg-primary text-white">
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Payment Status</th>
            <th>Order Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.orders?.map((order) => (
            <tr key={order?._id}>
              <td>{order?._id}</td>
              <td>${order?.totalAmount}</td>
              <td>{order?.paymentInfo?.status?.toUpperCase()}</td>
              <td>{order?.orderStatus}</td>
              <td>
                <Link to={`/me/order/${order?._id}`} className="btn btn-primary btn-sm">
                  <i className="fa fa-eye"></i>
                </Link>
                <Link to={`/invoice/order/${order?._id}`} className="btn btn-success btn-sm ms-2">
                  <i className="fa fa-print"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MyOrders;
