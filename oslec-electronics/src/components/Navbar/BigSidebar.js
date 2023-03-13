import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/BigSidebar";
import NavLinks from "../NavLinks";
import Logo from "../../assets/image/logo1.png";

const BigSidebar = () => {
  const { showSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <header>
            <img src={Logo} className='dashboard-logo'/>
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
