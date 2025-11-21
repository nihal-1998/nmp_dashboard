import type { TOrderProduct } from "../../types/order.type";
import product_placeholder from "../../assets/images/product_placeholder.png";


type TProps = {
    product: TOrderProduct
}

const OrderProductItem = ({ product }: TProps) => {
  return (
    <>
          <div className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-300 rounded-lg">
              <div className="flex-shrink-0">
                  <img
                      src={product?.image || product_placeholder}
                      alt="product_img"
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-lg"
                      onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = product_placeholder;
                      }}
                  />
              </div>
              <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 truncate">{product?.name}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2">
                      <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600">Qty: {product?.quantity}</span>
                          <span className="text-sm text-gray-600">${product.price.toFixed(2)} each</span>
                      </div>
                      <div className="mt-2 sm:mt-0">
                          <span className="text-lg font-semibold text-gray-900">${product?.total.toFixed(2)}</span>
                      </div>
                  </div>
              </div>
          </div>
    </>
  )
}

export default OrderProductItem