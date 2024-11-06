import { Outlet } from "react-router-dom";
import Header from "../features/Header/Header";
import Footer from "../features/Footer/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
