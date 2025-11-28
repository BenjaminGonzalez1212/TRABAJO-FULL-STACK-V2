import HeaderVolver from "../tienda/components/HeaderVolver";
import Footer from "../tienda/components/Footer";
import AdminHeaderVolver from "../tienda/components/AdminHeaderVolver";
import { Outlet } from "react-router-dom";

export default function LayoutAdminVolver() {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <AdminHeaderVolver />
        <main className="flex-grow-1">
          <Outlet /> {
          }
        </main>
    </div>
  );
}