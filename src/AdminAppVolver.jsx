import LayoutAdminVolver from "./layout/LayoutAdminVolver.jsx";
import { Outlet } from "react-router-dom";

export default function AdminAppVolver() {
  return (
    <LayoutAdminVolver>
      <Outlet />
    </LayoutAdminVolver>
  );
}