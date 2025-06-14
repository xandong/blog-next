"use server"

import { AppLayout } from "@/components/layout/app-layout"

export default async function Page({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <AppLayout>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Perfil
          </h1>

          {children}
        </div>
      </div>
    </AppLayout>
  )
}
