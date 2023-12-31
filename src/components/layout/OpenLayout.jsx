import { Outlet } from "react-router-dom";
import Footer from "../../common/Footer";
import Header from "../../common/Header";


const OpenLayout = () => {
    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default OpenLayout;