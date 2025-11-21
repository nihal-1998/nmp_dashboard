import React from "react";
import { Table, ConfigProvider, Pagination } from "antd";
import ChangeStatusModal from "../modal/auth/ChangeStatusModal";
import type { IMeta } from "../../types/global.type";
import type { IUser, IUserDataSource, TBlockStatus } from "../../types/user.type";
import DeleteAdminModal from "../modal/admin/DeleteAdminModal";
import EditAdminModal from "../modal/admin/EditAdminModal";


interface UserTableProps {
  users: IUser[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  isFetching: boolean;
}


const AdminTable: React.FC<UserTableProps> = ({
  users,
  meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  isFetching
}) => {

  const dataSource: IUserDataSource[] = users?.map((user, index) => ({
    key: index,
    serial: Number(index + 1) + (meta.page - 1) * pageSize,
    _id: user?._id,
    fullName: user?.fullName,
    email: user?.email,
    phone: user?.phone,
    status: user?.status,
    profile_img: user?.profile_img,
  }));


  const columns = [
    {
      title: "Serial",
      dataIndex: "serial",
      key: "serial",
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      width: "22.5%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "22.5%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "22.5%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      render: (status: TBlockStatus, record: IUser) => {
        const statusStyles = {
          blocked: "bg-red-100 text-red-700 border border-red-300",
          unblocked: "bg-green-100 text-green-700 border border-green-300",
        };

        const bgColor = status=== "blocked" ? statusStyles.blocked : statusStyles.unblocked;

        return (
          <div className="flex items-center gap-2">
            <button
              className={`${bgColor} w-20 cursor-default px-3 py-0.5 text-sm font-medium rounded-full`}
            >
              {status === "blocked" ?  "Blocked" : "Active"}
            </button>
            <ChangeStatusModal userId={record?._id} status={status}/>
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      width: "15%",
      render: (val: string, record: IUser) => (
        <div className="flex items-center gap-3">
          <EditAdminModal admin={record} />
          <DeleteAdminModal userId={val} />
        </div>
      ),
    },
  ];

  const handlePagination = (page: number, PageSize: number) => {
    setCurrentPage(page);
    setPageSize(PageSize);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#FEF3C7",
            headerColor: "#000000",
            rowHoverBg: "#F3F4F6",
            borderColor: "#E5E7EB",
          },
        },
      }}
    >
      <div className="w-full overflow-auto px-4 overflow-x-auto">
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey="_id"
          sticky
          scroll={{ y: "calc(100vh - 324px)" }}
          className="employer-table min-h-[calc(100vh-290px)]"
          loading={isFetching}
        />
      </div>
      {meta?.total > 0 && (
        <div className="p-8 bg-white border-t border-gray-200 shadow-md flex justify-center">
          <Pagination
            onChange={handlePagination}
            current={currentPage}
            pageSize={pageSize}
            total={meta?.total}
          />
        </div>
      )}
    </ConfigProvider>
  );
};

export default AdminTable;
