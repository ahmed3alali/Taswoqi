import React, { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import {
  useDeleteProductMutation,
  useGetAdminProductsQuery,
} from "../../Redux/api/productsApi";
import AdminLayout from "../layout/AdminLayout";

const ListProducts = () => {
  const { data, isLoading, error } = useGetAdminProductsQuery();

  const [
    deleteProduct,
    { isLoading: isDeleteLoading, error: deleteError, isSuccess },
  ] = useDeleteProductMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success("Product Deleted");
    }
  }, [error, deleteError, isSuccess]);

  const deleteProductHandler = (id) => {
    deleteProduct(id);
    window.location.reload();
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={"All Products"} />

      <h1 className="my-5">{data?.products?.length} Products</h1>

      <Table striped bordered hover responsive className="text-center">
        <thead className="bg-primary text-white">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.products?.map((product) => (
            <tr key={product?._id}>
              <td>{product?._id}</td>
              <td>{product?.name?.length > 20 ? product?.name.substring(0, 20) + "..." : product?.name}</td>
              <td>{product?.stock}</td>
              <td>
                <Link to={`/admin/products/${product?._id}`} className="btn btn-outline-primary btn-sm">
                  <i className="fa fa-pencil"></i>
                </Link>
                <Link to={`/admin/products/${product?._id}/upload_images`} className="btn btn-outline-success btn-sm ms-2">
                  <i className="fa fa-image"></i>
                </Link>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => deleteProductHandler(product?._id)}
                  disabled={isDeleteLoading}
                >
                  <i className="fa fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  );
};

export default ListProducts;
