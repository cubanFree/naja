export default function Home() {
    return (
        <main className="flex-1 h-full w-full max-w-7xl mx-auto flex flex-col">
            {[...Array(100)].map((_, index) => (
                <span>Hola</span>
            ))}
        </main>
    )
}