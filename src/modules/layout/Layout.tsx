import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header/Header";
import Menus from "./menu/Menus";
import { SidebarContext } from "../../_cloner/context/sidebarContext";
import AsideHeader from "./aside/AsideHeader";
import AsideAction from "./aside/AsideAction";

const Layout = () => {
    const { sideOpen, toogleSideOpen } = useContext(SidebarContext);

    return (
        <>
            {/* Web Screen */}
            <div className="hidden lg:flex w-full h-screen bg-gray">
                <header
                    className={`fixed top-0 right-0 left-0 z-10 px-8 py-4 bg-grayLight1 transition-all duration-700 ${sideOpen
                        ? "right-[280px] w-[calc(100%-280px)]"
                        : "right-[80px] w-[calc(100%-80px)]"
                        }`}
                >
                    <Header toggleSidebar={toogleSideOpen} />
                </header>

                <aside className={`fixed bottom-8 right-0 top-0 h-full bg-primary transition-all duration-700 ${sideOpen ? "w-[280px]" : "w-[80px] py-8"}`}>
                    <AsideHeader />
                    <div className="overflow-y-auto px-4" style={{ maxHeight: "calc(100% - 80px)" }}>
                        <Menus />
                    </div>
                </aside>
                <main
                    className={`absolute left-0 transition-all duration-700 top-20 ${sideOpen
                        ? "right-[280px] w-[calc(100%-280px)]"
                        : "right-[80px] w-[calc(100%-80px)]"
                        }`}
                >
                    <section className="px-8 py-4">
                        <Outlet />
                    </section>
                </main>
            </div>

            {/* Mobile Screen */}
            <div className="lg:hidden w-full h-screen bg-grayLight">
                <header
                    className={`fixed top-0 right-0 left-0 z-10 px-8 py-4 bg-grayLight transition-all duration-700 ${sideOpen
                        ? "mr-[220px] w-[calc(100%-220px)]"
                        : "mr-0 w-[100%]"
                        }`}
                >
                    <Header
                        toggleSidebar={toogleSideOpen}
                        hasSerachInput={false}
                    />
                </header>
                <aside
                    className={`fixed right-0 top-0 h-full bg-gray transition-all duration-700 z-[9999] ${sideOpen ? "w-[220px] p-4" : "w-[0px]"
                        }`}
                >
                    <AsideHeader />
                    <div className="mt-8">
                        <AsideAction />
                    </div>
                    <div className="mt-8">
                        <Menus />
                    </div>
                </aside>
                {sideOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
                        onClick={toogleSideOpen}
                    ></div>
                )}
                <main
                    className={`overflow-auto transition-all duration-700 pt-16`}
                >
                    <section className="px-8 py-4">
                        <Outlet />
                    </section>
                </main>
            </div>
        </>
    );
};

export default Layout;
