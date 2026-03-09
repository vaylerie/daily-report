"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

import { AppSidebar } from "@/components/navigation/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

function BreadcrumbContent() {
  const searchParams = useSearchParams()
  const title = searchParams.get("title") || "Dashboard"

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/dashboard">Daily Report</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <SidebarProvider
        style={
            {
            "--sidebar-width": "19rem",
            } as React.CSSProperties
        }
        >
            <AppSidebar/>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Suspense fallback={<div>Loading...</div>}>
                  <BreadcrumbContent />
                </Suspense>
                </header>
                <div>
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

