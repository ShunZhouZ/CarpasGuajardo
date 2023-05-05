import React, { PropsWithChildren, useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Overlay from "./overlay";

const Layout = (props: PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="grid min-h-screen grid-rows-header bg-zinc-100">
      <Overlay isActive={sidebarOpen} />

      <div>
        <Navbar onMenuButtonClick={() => setSidebarOpen((prev) => !prev)} />
      </div>

      <div className="grid md:grid-cols-sidebar">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
