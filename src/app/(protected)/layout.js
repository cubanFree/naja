import LoadingContent from "@/components/loadingContent";
import FooterProtected from "@/components/protectedUi/footerProtected";
import HeaderProtected from "@/components/protectedUi/headerProtected";

export const metadata = {
    title: "Home"
}

export default function ProtectedLayout({ children }) {
    return (
        <LoadingContent>
            <div className="flex flex-col h-screen">
                <HeaderProtected />
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
                <FooterProtected />
            </div>
        </LoadingContent>
    )
}