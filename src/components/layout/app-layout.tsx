import { Header } from "./header"

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[100vw] min-h-[100vh] bg-background flex flex-col items-center">
      <Header />

      <main className="flex-1 flex items-center flex-col p-4 pt-2 max-w-7xl w-full">
        {children}
      </main>

      <footer className="w-full bg-background text-foreground text-center py-4 px-4">
        © {new Date().getFullYear()} <strong>Share4us</strong> Blog. Todos os
        direitos reservados.
      </footer>
    </div>
  )
}
