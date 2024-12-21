import LoadingContent from "@/components/loadingContent";

export default function ProtectedLayout({ children }) {
    return (
        <LoadingContent>
            <header>Header</header>
            {children}
            <footer>Footer</footer>
        </LoadingContent>
    )
}