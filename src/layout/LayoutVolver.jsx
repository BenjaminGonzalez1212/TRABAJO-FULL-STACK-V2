import HeaderVolver from "../tienda/components/HeaderVolver";
import Footer from "../tienda/components/Footer";
import { Outlet } from "react-router-dom";

export default function LayoutVolver() {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <HeaderVolver />

      <main className="flex-grow-1">
        <Outlet /> {
        }
      </main>

      <Footer />
    </div>
  );
}