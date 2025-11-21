import { Table, ConfigProvider, Pagination } from "antd";
import { Edit, Eye } from "lucide-react";
import type { IMeta } from "../../types/global.type";
import { Link, useNavigate } from "react-router-dom";
import product_placeholder from "../../assets/images/product_placeholder.png";
import type { IProduct, TProductDataSource, TProductStatus, TStockStatus } from "../../types/product.type";
import { FaStar } from "react-icons/fa";
import ChangeProductStatusModal from "../modal/product/ChangeProductStatusModal";
import DeleteProductModal from "../modal/product/DeleteProductModal";
import getTypeColor from "../../utils/getTypeColor";


type TProps = {
  products: IProduct[];
  meta: IMeta,
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
};


const ProductTable = ({ products, meta, currentPage, setCurrentPage, pageSize, setPageSize, loading }: TProps) => {
   const navigate = useNavigate();

  const dataSource: TProductDataSource[] = products?.map((product, index) => ({
    key: index,
    serial: Number(index + 1) + ((currentPage - 1) * pageSize),
    _id: product?._id,
    name: product?.name,
    type: product?.type,
    category: product?.category,
    brand: product?.brand,
    flavor: product?.flavor,
    currentPrice: product?.currentPrice,
    originalPrice: product?.originalPrice,
    quantity: product?.quantity,
    image: product?.image,
    ratings: product?.ratings,
    status: product?.status,
    stockStatus: product?.stockStatus
  }));



  const columns = [
    {
      title: "S.N.",
      dataIndex: "serial",
      key: "serial",
      width: 60,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "title",
      width: 160,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 100,
      render: (val: string) => (
        <>
          {/* <img src={val} alt="icon" className="w-12 h-12 rounded-md" /> */}
          <img
            src={val}
            alt="product"
            className="w-[45px] h-[45px] rounded-lg"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = product_placeholder;
            }}
          />
        </>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 150,
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
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 100,
      render: (text: string) => (
        <>
          <p className="truncate">{text}</p>
        </>
      ),
    },
    {
      title: "Price",
      dataIndex: "currentPrice",
      key: "currentPrice",
      width: 85,
      align: 'center' as const,
      render: (val: number) => (
        <span>${val}</span>
      )
    },
    {
      title: "Original Price",
      dataIndex: "originalPrice",
      key: "originalPrice",
      width: 120,
      align: 'center' as const,
       render: (val: number) => (
        <span>${val}</span>
      )
    },
    {
      title: "Ratings",
      dataIndex: "ratings",
      key: "ratings",
      width: 80,
      align: 'center' as const,
      render: (value: number) => (
        <>
          <div className="flex items-center gap-1 justify-center">
            <FaStar className="text-yellow-500" size={18} />
            <span>{value}</span>
          </div>
        </>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 145,
      render: (status: TProductStatus, record: TProductDataSource) => {
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
            <ChangeProductStatusModal productId={record?._id} status={status} />
          </div>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 80,
      align: 'center' as const,
    },
    {
      title: "Stock Status",
      dataIndex: "stockStatus",
      key: "stockStatus",
      width: 120,
      render: (status: TStockStatus) => {
        const statusStyles = {
          "In Stock": "bg-blue-100 text-blue-800 border border-blue-300",
          "Out of Stock": "bg-gray-200 text-gray-700 border border-gray-400",
          "Limited Stock": "bg-yellow-100 text-yellow-800 border border-yellow-300",
        };

        const bgColor = statusStyles[status] || "bg-neutral-100 text-neutral-700 border";

        return (
          <div className="flex items-center gap-2">
            <button
              className={`${bgColor} capitalize w-28 cursor-default px-3 py-0.5 text-sm font-medium rounded-full`}
            >
              {status.replace("_", " ")}
            </button>
          </div>
        );
      }
    },
    {
      title: "View",
      dataIndex: "_id",
      key: "_id",
      width: 80,
      render: (productId: string) => (
        <div className="flex items-center gap-2">
          <Link
            to={`/product-details/${productId}`}
            className="bg-gray-600 hover:bg-gray-700 p-2 text-white rounded-full"
          >
            <Eye size={18} />
          </Link>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "action",
      width: 115,
      render: (productId: string) => (
        <div className="flex items-center gap-2">
          <button
            onClick={()=>navigate(`/update-product/${productId}`)}
            className="bg-green-600 hover:bg-green-700 p-2 text-white cursor-pointer rounded-full"
          >
            <Edit size={18} />
          </button>
          <DeleteProductModal productId={productId} />
        </div>
      ),
    },
  ];



  const handlePagination = (page: number, PageSize: number) => {
    setCurrentPage(page);
    setPageSize(PageSize)
  }



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
      <div className="w-full overflow-auto px-4 overflow-x-auto sm:overflow-x-visible">
        <Table
          size="small"
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey="_id"
          sticky
          loading={loading}
          scroll={{ y: "calc(100vh - 324px)" }}
          locale={{
            emptyText: (
              <div
                className="flex flex-col items-center justify-center text-gray-500 space-y-4"
                style={{ minHeight: "calc(100vh - 324px)" }}
              >
                <img
                  src={product_placeholder}
                  alt="No products"
                  className="w-32 h-32 opacity-70"
                />

                {/* Message */}
                <p className="text-lg font-medium">No Products Found</p>
              </div>
            ),
          }}
          className="employer-table min-h-[calc(100vh-324px)]"
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

export default ProductTable;
