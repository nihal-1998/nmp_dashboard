import { Dropdown, type MenuProps } from "antd"
import { Download } from "lucide-react";
import exportFromJSON from "export-from-json";
import { useGetExportProductsQuery } from "../../redux/features/product/productApi";
import type { IProduct } from "../../types/product.type";

const ExportProductData = () => {
     const { data, isLoading } = useGetExportProductsQuery(undefined);
     const products = data?.data || [];

    const DownloadExport = () => {
        const fileName = 'products'
        if (products?.length > 0) {
            const csvData = products?.map((item: IProduct) => ({
                Name: item?.name,
                Type: item?.type,
                Category: item?.category,
                Price: item?.currentPrice,
                Quantity: item?.quantity
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
      doc.text("Product Data Export", 14, 22)

      // Add export info
      doc.setFontSize(12)
      doc.text(`Export Date: ${new Date().toLocaleDateString()}`, 14, 32)
      doc.text(`Total Records: ${products?.length}`, 14, 40)

      // Prepare table data
      const tableData = products?.map((product:IProduct, index:number) => [
        Number(index+1),
        product?.name,
        product?.type,
        product?.category,
        product?.currentPrice,
        product?.quantity,
      ])

      // Add table
      autoTable(doc, {
        head: [["S.N.", "Name", "Type", "Category", "Price", "Quantity"]],
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
      doc.save(`${"products"}-${new Date().toISOString().split("T")[0]}.pdf`)
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
                <button disabled={isLoading} className="px-3 w-full sm:w-auto flex justify-center gap-2 py-2 lg:py-2 text-white bg-blue-500 hover:bg-blue-600 duration-200 rounded-md">
                    <Download />Export Data</button>
            </Dropdown>
        </>
    )
}

export default ExportProductData