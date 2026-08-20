// @ts-nocheck
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { Link } from "react-router";
import Navitems from "./Navitems";

const MobileSidebar = () => {
  let sidebar: SidebarComponent;
  const toggleSidebar = () => {
    sidebar.toggle();
  };
  return (
    <div className="mobile-sidebar wrapper">
      <header>
        <Link to="/">
          <img src="/assets/icons/logo.svg" alt="Logo" className="size-7.5" />
          <h1 className="font-bold tracking-tighter">
            Tra<span className="font-extralight ">verse</span>
          </h1>
        </Link>
        <button onClick={toggleSidebar}>
          <img src="/assets/icons/menu.svg" alt="Menu" className="size-7" />
        </button>
      </header>
      <SidebarComponent
        width={270}
        ref={(scope) => (sidebar = scope)}
        created={() => sidebar.hide()}
        closeOnDocumentClick={true}
        showBackdrop={true}
        type="over"
      >
        <Navitems handleClick={toggleSidebar} />
      </SidebarComponent>
    </div>
  );
};

export default MobileSidebar;
