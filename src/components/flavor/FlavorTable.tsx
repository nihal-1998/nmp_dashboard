import { Table, ConfigProvider, Pagination } from "antd";
import type { IMeta } from "../../types/global.type";
import DeleteFlavorModal from "../modal/flavor/DeleteFlavorModal";
import EditFlavorModal from "../modal/flavor/EditFlavorModal";
import type { IFlavor, IFlavorDataSource, TFlavorStatus } from "../../types/flavor.type";
import getTypeColor from "../../utils/getTypeColor";
import ChangeFlavorStatusModal from "../modal/flavor/ChangeFlavorStatusModal";



type TProps = {
  flavors: IFlavor[];
  meta: IMeta;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
}


const FlavorTable = ({
  flavors, meta,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  loading
}: TProps) => {

  const dataSource: IFlavorDataSource[] = flavors?.map((flavor, index) => ({
    key: index,
    serial: Number(index + 1) + (meta.page - 1) * pageSize,
    _id: flavor?._id,
    name: flavor?.name,
    typeId: flavor?.typeId,
    type: flavor?.type,
    status: flavor?.status
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
      width: 230,
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
      render: (status: TFlavorStatus, record: IFlavorDataSource) => {
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
            <ChangeFlavorStatusModal flavorId={record?._id} status={status} />
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      width: 115,
      render: (val: string, record: IFlavor) => (
        <div className="flex items-center gap-3">
          <EditFlavorModal flavor={record} />
          <DeleteFlavorModal flavorId={val} />
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
            headerBg: "#FEF3C7", // Amber-50 color
            headerColor: "#000000",
            rowHoverBg: "#F3F4F6", // Gray-100 color
            borderColor: "#E5E7EB", // Gray-200 color
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
          loading={loading}
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

export default FlavorTable;
