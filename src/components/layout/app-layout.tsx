import { Header } from "./header"

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[100vw] min-h-[100vh] bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex justify-center p-4">{children}</main>
      <footer className="bg-gray-800 text-white text-center py-4">
        © {new Date().getFullYear()} <strong>Share4us</strong> Blog. Todos os
        direitos reservados.
      </footer>
    </div>
  )
}
