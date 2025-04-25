import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"
import { IoLockClosedOutline } from "react-icons/io5";

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-auto py-2 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo className="h-6 w-6" />
          {/* <span className="inline-block font-bold">{siteConfig.name}</span> */}
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Button variant='outline' className="flex items-center gap-2 text-inherit">
              <IoLockClosedOutline />
              Acesso Restrito
            </Button>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
