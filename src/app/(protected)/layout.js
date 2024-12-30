import LoadingContent from "@/components/loadingContent";
import FooterProtected from "@/components/protectedUi/footerProtected";
import HeaderProtected from "@/components/protectedUi/headerProtected";

export const metadata = {
    title: "Home"
}

export default function ProtectedLayout({ children }) {
    return (
        <LoadingContent>
            <HeaderProtected />
            {children}
            <FooterProtected />
        </LoadingContent>
    )
}