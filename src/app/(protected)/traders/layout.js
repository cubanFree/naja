import FooterTraders from "@/components/protectedUi/traders/footerTraders";

export default function TradersLayout({ children }) {
    return (
        <div className="h-full flex flex-col w-full max-w-7xl mx-auto">
            <div className="flex-1 overflow-hidden">
                {children}
            </div>
            <FooterTraders />
        </div>
    )
}