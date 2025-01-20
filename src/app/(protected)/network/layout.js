import FooterNetwork from "@/components/protectedUi/network/footerNetwork";

export default function MessagesLayout({ children }) {

    return (
        <div className="h-full flex flex-col w-full max-w-7xl mx-auto">
            <div className="flex-1 overflow-hidden">
                {children}
            </div>
            <FooterNetwork />
        </div>
    )
}