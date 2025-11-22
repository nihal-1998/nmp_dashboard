import React, { Suspense, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import ListLoading from "../loader/ListLoading";
import ServerErrorCard from "../card/ServerErrorCard";
import { useGetTypeDropDownQuery } from "../../redux/features/type/typeApi";
import { useAppSelector } from "../../redux/hooks/hooks";
import ExportProductData from "./ExportProductData";
import { RefreshCw } from "lucide-react";
const ProductTable = React.lazy(() => import("./ProductTable"));


const ProductList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeId, setTypeId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useGetTypeDropDownQuery(undefined);
  const { typeOptions } = useAppSelector((state) => state.type);
  const { data, isLoading, isFetching, isError, refetch } = useGetProductsQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: pageSize },
    { name: "searchTerm", value: searchTerm },
    { name: "typeId", value: typeId }
  ]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(searchQuery);
      setCurrentPage(1)
    }, 600);
    return () => clearTimeout(timeoutId); // cleanup for debounce
  }, [searchQuery]);


  const products = data?.data || [];
  const meta = data?.meta || {};


  let content: React.ReactNode;


  if (isLoading) {
    content = <ListLoading />;
  }

  if (!isLoading && !isError) {
    content = (
      <Suspense fallback={<ListLoading />}>
        <ProductTable
          products={products}
          meta={meta}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          loading={isFetching}
        />
      </Suspense>
    );
  }

  if (!isLoading && isError) {
    content = <ServerErrorCard />;
  }

  return (
    <>
      <div className="p-4 flex justify-between lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* LEFT SIDE */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
            Product List
          </h1>
          <h1 className="text-sm sm:text-lg">
            Total: <span className="font-bold">{meta?.total || 0}</span>
          </h1>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap xl:flex-nowrap items-stretch sm:items-center justify-end gap-4 w-full lg:w-auto">
          {/* FILTER */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
            <h1 className="text-sm whitespace-nowrap">Filter by Type:</h1>
            <select
              className="w-full sm:w-auto p-2 bg-white border border-gray-300 rounded-md focus:border-blue-300"
              value={typeId}
              disabled={typeOptions?.length === 0}
              onChange={(e) => {
                setTypeId(e.target.value)
                setCurrentPage(1)
              }}
            >
              <option value="">All</option>
              {typeOptions?.map((type, index) => (
                <option key={index} value={type?.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* SEARCH */}
          <div className="relative w-full sm:w-64 lg:w-72">
            <span className="absolute inset-y-0 left-3 hidden lg:flex items-center text-gray-600">
              <FaSearch size={16} />
            </span>

            <input
              type="text"
              placeholder="Search by name, type, category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 lg:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* ADD PRODUCT */}
          <button
            onClick={() => navigate("/add-product")}
            className="w-full sm:w-auto px-4 py-2 bg-primary text-white rounded-md hover:bg-[#2b4773] transition-colors"
          >
            Add New
          </button>

          {/* EXPORT */}
          <div className="w-full sm:w-auto">
            <ExportProductData />
          </div>

          {/* REFRESH */}
          <button
            onClick={refetch}
            disabled={isFetching}
            className="w-full sm:w-auto px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
            title="Refresh products"
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

export default ProductList;
