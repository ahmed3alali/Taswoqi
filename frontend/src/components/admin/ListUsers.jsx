import React, { useEffect } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { useDeleteUserMutation, useGetAdminUsersQuery } from "../../Redux/api/userApi";

const ListUsers = () => {
  const { data, isLoading, error } = useGetAdminUsersQuery();

  console.log("Users Data:", data?.users);



  const [deleteUser, { error: deleteError, isLoading: isDeleteLoading, isSuccess }] =
    useDeleteUserMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success("User Deleted");
    }
  }, [error, deleteError, isSuccess]);

  const deleteUserHandler = (id) => {
    deleteUser(id);
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={"All Users"} />
      <h1 className="my-5">{data?.theUsers?.length} Users</h1>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.theUsers?.map((user) => (
              <tr key={user?._id}>
                <td>{user?._id}</td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>
                  <Link to={`/admin/users/${user?._id}`} className="btn btn-outline-primary btn-sm">
                    <i className="fa fa-pencil"></i>
                  </Link>

                  <button
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => deleteUserHandler(user?._id)}
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

export default ListUsers;
