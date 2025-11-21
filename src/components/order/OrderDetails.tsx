import { ArrowLeft, Building2, Calendar, CreditCard, FolderArchive, MailOpen, MapPinHouse, MapPinned, Package, PhoneCall, Truck } from "lucide-react";
import type { ISingleOrder } from "../../types/order.type";
import OrderProductItem from "./OrderProductItem";
import { useNavigate } from "react-router-dom";
import getFormattedDate from "../../utils/getFormattedDate";
import getStatusColor from "../../utils/getStatusColor";
import getPaymentStatusColor from "../../utils/getPaymentStatusColor";
import { SiNamesilo } from "react-icons/si";

type TProps = {
  order: ISingleOrder
}

const OrderDetails = ({order}: TProps) =>{
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-full py-4 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button onClick={()=>navigate("/orders")} className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Orders
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Order #{order?.token}</h1>
              <p className="text-gray-600 mt-1">Placed on {getFormattedDate(order?.createdAt)}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order?.status)}`}>
                {order?.status.charAt(0).toUpperCase() + order?.status.slice(1)}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getPaymentStatusColor(order?.paymentStatus)}`}
              >
                {order?.paymentStatus.charAt(0).toUpperCase() + order?.paymentStatus.slice(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Timeline */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                Order Status
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Package className="w-4 h-4 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Order Confirmed</p>
                    <p className="text-sm text-gray-500">{getFormattedDate(order?.createdAt)}</p>
                  </div>
                </div>
                {order?.status === "delivered" && (
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Delivered</p>
                      <p className="text-sm text-gray-500">
                        {order?.deliveryAt ? getFormattedDate(order?.deliveryAt) : "Recently delivered"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Products */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items ({order?.products.length})</h2>
              <div className="space-y-4">
                {order?.products?.map((product, index) => (
                  <OrderProductItem product={product} key={index}/>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">
                    ${order?.subTotal?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping Cost</span>
                  <span className="text-gray-900">${order?.shippingCost}</span>
                </div>
    
                <div className="pt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold text-gray-900">Total</span>
                    <span className="text-base font-semibold text-gray-900">${order?.total?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Cutomer Information</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <SiNamesilo className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div className="flex gap-2 items-center">
                    <p className="text-sm font-medium text-gray-900">Customer Name: </p>
                    <p className="text-sm text-gray-600">{order?.customerName}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MailOpen   className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div className="flex gap-2 items-center">
                    <p className="text-sm font-medium text-gray-900">Email:</p>
                    <p className="text-sm text-gray-600">{order?.customerEmail}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <PhoneCall  className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div className="flex gap-2 items-center">
                    <p className="text-sm font-medium text-gray-900">Mobile Number:</p>
                    <p className="text-sm text-gray-600 capitalize">{order?.customerPhone}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPinned  className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div className="flex gap-2 items-center">
                    <p className="text-sm font-medium text-gray-900">Street Address: </p>
                    <p className="text-sm text-gray-600">{order?.shipping?.streetAddress}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Building2  className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div className="flex gap-2 items-center">
                    <p className="text-sm font-medium text-gray-900">City:</p>
                    <p className="text-sm text-gray-600">{order?.shipping?.city}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPinHouse className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div className="flex gap-2 items-center">
                    <p className="text-sm font-medium text-gray-900">State:</p>
                    <p className="text-sm text-gray-600 capitalize">{order?.shipping?.state}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FolderArchive className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div className="flex gap-2 items-center">
                    <p className="text-sm font-medium text-gray-900">Zip Code:</p>
                    <p className="text-sm text-gray-600 capitalize">{order?.shipping?.zipCode}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Package className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order ID</p>
                    <p className="text-sm text-gray-600">{order?._id}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order Date</p>
                    <p className="text-sm text-gray-600">{getFormattedDate(order?.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CreditCard className="w-5 h-5 text-gray-400 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Payment Status</p>
                    <p className="text-sm text-gray-600 capitalize">{order?.paymentStatus}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default OrderDetails;