export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[100vw] min-h-[100vh] bg-neutral-900 flex justify-center items-center">
      <div className="py-6">{children}</div>
    </div>
  )
}
