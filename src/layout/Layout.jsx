import Header from "../tienda/components/Header";
import Footer from "../tienda/components/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Header />

      <main className="flex-grow-1">
        <Outlet /> {
          
        }
      </main>

      <Footer />
    </div>
  );
}
