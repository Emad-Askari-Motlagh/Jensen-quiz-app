import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import "./Layout.scss";

export default function PrimaryLayout({ user }: { user: any }) {
  //persist product filters and user on server side renders

  return (
    <div className="container">
      <Header user={user} />
      <Outlet />
      <Footer />
    </div>
  );
}
