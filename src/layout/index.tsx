import { cn } from "@/lib/utils";

const Layout: React.FC<{ children: React.ReactNode, header?: boolean }> = ({ }) => {
    return (
        <>
            <div
                className={cn("content-wrapper transition-all duration-150 ")}
            >
                <div
                    className={cn(
                        "pt-6 pb-8 px-4  page-min-height-semibox ",

                    )}
                >
                    <div className="semibox-content-wrapper ">
                        {/* <LayoutWrapper
                isMobile={isMobile}
                setOpen={setOpen}
                open={open}
                location={location}
                trans={trans}
              >
                {children}
              </LayoutWrapper> */}
                    </div>
                </div>
            </div>
        </>
    )

}

export default Layout;