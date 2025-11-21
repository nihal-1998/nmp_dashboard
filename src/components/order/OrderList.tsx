import React, { Suspense, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useGetOrdersQuery } from "../../redux/features/order/orderApi";
import ListLoading from "../loader/ListLoading";
import ServerErrorCard from "../card/ServerErrorCard";
import ExportOrderData from "./ExportOrderData";
import { RefreshCw } from "lucide-react";
const OrderTable = React.lazy(() => import("./OrderTable"));


const OrderList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data, isLoading, isFetching, isError, refetch } = useGetOrdersQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm },
    { name: "status", value: status },
  ]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(searchQuery);
      setCurrentPage(1)
    }, 600);

    return () => clearTimeout(timeoutId); // cleanup for debounce
  }, [searchQuery]);



  const orders = data?.data || [];
  const meta = data?.meta || {};

  let content: React.ReactNode;


  if (isLoading) {
    content = <ListLoading />;
  }

  if (!isLoading && !isError) {
    content = (
      <Suspense fallback={<ListLoading />}>
        <OrderTable
          orders={orders}
          meta={meta}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          isFetching={isFetching}
        />
      </Suspense>
    );
  }

  if (!isLoading && isError) {
    content = <ServerErrorCard />;
  }



  return (
    <>
      <div className="p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        {/* LEFT SIDE */}
        <div className="flex justify-between sm:flex-row sm:items-center gap-4 sm:gap-8">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
            Order List
          </h1>

          <h1 className="text-sm sm:text-lg">
            Total: <span className="font-bold">{meta?.total}</span>
          </h1>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap xl:flex-nowrap items-stretch sm:items-center gap-4 sm:gap-6 justify-end w-full lg:w-auto">

          {/* Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
            <h1 className="text-sm whitespace-nowrap">Filter by Status:</h1>
            <select
              className="w-full sm:w-auto p-2 bg-white border border-gray-300 rounded-md focus:border-blue-300"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value)
                setCurrentPage(1)
              }}
            >
              <option value="">All</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <span className="absolute inset-y-0 left-3 hidden lg:flex items-center text-gray-600">
              <FaSearch size={16} />
            </span>

            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 lg:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Export */}
          <div className="w-full sm:w-auto">
            <ExportOrderData />
          </div>

          {/* Refresh Button */}
          <button
            onClick={refetch}
            disabled={isFetching}
            className="w-full sm:w-auto px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white cursor-pointer rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
            title="Refresh orders"
          >
            <RefreshCw
              className={`h-5 w-5 ${!isLoading && isFetching && "animate-spin"
                }`}
            />
            <span className="sm:hidden">Refresh</span>
          </button>

        </div>
      </div>
      {content}
    </>
  );
};

export default OrderList;
