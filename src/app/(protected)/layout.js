import AppContent from "@/components/appContent";
import LoadingContent from "@/components/loadingContent";

export const metadata = {
    title: "Home"
}

export default function ProtectedLayout({ children }) {
    return (
        <AppContent>
            <LoadingContent>
                <header>Header</header>
                {children}
                <footer>Footer</footer>
            </LoadingContent>
        </AppContent>
    )
}