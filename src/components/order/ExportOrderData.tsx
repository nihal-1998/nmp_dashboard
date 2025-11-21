import { Dropdown, type MenuProps } from "antd"
import { Download } from "lucide-react";
import exportFromJSON from "export-from-json";
import { useGetExportOrdersQuery } from "../../redux/features/order/orderApi";
import type { IExportOrder } from "../../types/order.type";

const ExportOrderData = () => {
    const { data, isLoading } = useGetExportOrdersQuery(undefined);
    const orders = data?.data || [];

    const DownloadExport = () => {
        const fileName = 'orders'
        if (orders?.length > 0) {
            const csvData = orders?.map((item:IExportOrder) => ({
                Token: item?.token,
                Customer: item?.fullName,
                Email: item?.email,
                "Mobile Number": item?.phone,
                "Sub Total": item?.subTotal,
                "Shipping Cost": item?.shippingCost,
                "Total": item?.total,
                "status": item?.status,
                "Delivery Date": item?.deliveryAt ? item?.deliveryAt?.split("T")[0] : "Not Yet",
                "Order Date": item?.createdAt?.split("T")[0]
            }))
            exportFromJSON({ data: csvData, fileName: fileName, exportType: "csv" })
        }
    }


  const exportToPDF = async () => {

    try {
      // Dynamic import to avoid SSR issues
      const { jsPDF } = await import("jspdf")
      const { default: autoTable } = await import("jspdf-autotable")

      const doc = new jsPDF()

      // Add title
      doc.setFontSize(20)
      doc.text("Order Data Export", 14, 22)

      // Add export info
      doc.setFontSize(12)
      doc.text(`Export Date: ${new Date().toLocaleDateString()}`, 14, 32)
      doc.text(`Total Records: ${orders?.length}`, 14, 40)

      // Prepare table data
      const tableData = orders?.map((order: IExportOrder, index: number) => [
        Number(index+1),
        order.token,
        order.fullName,
        order.email,
        order?.total,
        order?.status,
        order?.deliveryAt ? order?.deliveryAt?.split("T")[0] : "Not Yet",
        order?.createdAt?.split("T")[0]
      ])

      // Add table
      autoTable(doc, {
        head: [["S.N.", "Token", "Customer", "Email", "Total", "Status", "Delivery Date", "Order Date"]],
        body: tableData,
        startY: 50,
        styles: {
          fontSize: 8,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
        margin: { top: 50 },
      })

      // Save the PDF
      doc.save(`${"orders"}-${new Date().toISOString().split("T")[0]}.pdf`)
    } catch (error) {
      console.error("Error exporting PDF:", error)
    }
  }


    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <button onClick={DownloadExport}>
                    Export as CSV
                </button>
            ),
        },
        {
            key: '2',
            label: (
                <button onClick={exportToPDF}>
                    Export as PDF
                </button>
            ),
        },
    ];





    return (
        <>
            <Dropdown menu={{ items }} placement="bottomRight">
                <button disabled={isLoading} className="px-3 w-full sm:w-auto flex justify-center cursor-pointer gap-2 py-2 lg:py-2 text-white bg-blue-500 hover:bg-blue-600 duration-200 rounded-md disabled:cursor-not-allowed">
                    <Download />Export Data</button>
            </Dropdown>
        </>
    )
}

export default ExportOrderData