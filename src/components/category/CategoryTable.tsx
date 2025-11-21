import { Table, ConfigProvider, Pagination } from "antd";
import EditCategoryModal from "../modal/category/EditCategoryModal";
import type { ICategory, ICategoryDataSource, TCategoryStatus } from "../../types/category.type";
import DeleteCategoryModal from "../modal/category/DeleteCategoryModal";
import type { IMeta } from "../../types/global.type";
import getTypeColor from "../../utils/getTypeColor";
import ChangeCategoryStatusModal from "../modal/category/ChangeCategoryStatusModal";



type TProps = {
  categories: ICategory[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  isFetching: boolean;
}


const CategoryTable = ({
  categories, meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  isFetching
}: TProps) => {

  const dataSource: ICategoryDataSource[] = categories?.map((category, index) => ({
    key: index,
    serial: Number(index + 1) + (meta.page - 1) * pageSize,
    _id: category?._id,
    name: category?.name,
    typeId: category?.typeId,
    type: category?.type,
    status: category?.status
  }))

  const columns = [
    {
      title: "S.N.",
      dataIndex: "serial",
      key: "serial",
      width: 60,
    },
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      width: 180,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 180,
      render: (type: string) => {
        const styleClass = getTypeColor(type);
        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${styleClass}`}
          >
            {type}
          </span>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 145,
      render: (status: TCategoryStatus, record: ICategoryDataSource) => {
        const statusStyles = {
          hidden: "bg-red-100 text-red-700 border border-red-300",
          visible: "bg-green-100 text-green-700 border border-green-300",
        };

        const bgColor = status === "visible" ? statusStyles.visible : statusStyles.hidden;

        return (
          <div className="flex items-center gap-2">
            <button
              className={`${bgColor} capitalize w-20 cursor-default px-3 py-0.5 text-sm font-medium rounded-full`}
            >
              {status}
            </button>
            <ChangeCategoryStatusModal categoryId={record?._id} status={status} />
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      width: 115,
      render: (val: string, record: ICategory) => (
        <div className="flex items-center gap-3">
          <EditCategoryModal category={record} />
          <DeleteCategoryModal categoryId={val} />
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
          scroll={{ y: "calc(100vh - 265px)" }}
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

export default CategoryTable;
