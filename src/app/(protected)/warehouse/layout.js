import FooterWarehouse from "@/components/protectedUi/warehouse/footerWarehouse";

export default function WarehouseLayout({ children }) {
    return (
        <div className="h-full flex flex-col w-full max-w-7xl mx-auto">
            <div className="flex-1 overflow-hidden">
                {children}
            </div>
            <FooterWarehouse />
        </div>
    )
}