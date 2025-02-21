import React, { useEffect } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { useDeleteOrderMutation, useGetAdminOrdersQuery } from "../../Redux/api/orderApi";

const ListOrders = () => {
  const { data, isLoading, error } = useGetAdminOrdersQuery();

  const [deleteOrder, { error: deleteError, isLoading: isDeleteLoading, isSuccess }] =
    useDeleteOrderMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success("Order Deleted");
    }
  }, [error, deleteError, isSuccess]);

  const deleteOrderHandler = (id) => {
    deleteOrder(id);
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={"All Orders"} />
      <h1 className="my-5">{data?.orders?.length} Orders</h1>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.orders?.map((order) => (
              <tr key={order?._id}>
                <td>{order?._id}</td>
                <td>{order?.paymentInfo?.status?.toUpperCase()}</td>
                <td>{order?.orderStatus}</td>
                <td>
                  <Link to={`/admin/orders/${order?._id}`} className="btn btn-outline-primary btn-sm">
                    <i className="fa fa-pencil"></i>
                  </Link>

                  <button
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => deleteOrderHandler(order?._id)}
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
    </AdminLayout>
  );
};

export default ListOrders;
