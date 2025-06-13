import { Header } from "./header"

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[100vw] min-h-[100vh] bg-neutral-900 flex flex-col">
      <Header />

      <main className="flex-1 flex">{children}</main>
    </div>
  )
}
