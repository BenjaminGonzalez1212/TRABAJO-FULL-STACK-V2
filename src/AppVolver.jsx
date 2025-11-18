import LayoutVolver from "./layout/LayoutVolver";
import { Outlet } from "react-router-dom";

export default function AppVolver() {
  return (
    <LayoutVolver>
      <Outlet />
    </LayoutVolver>
  );
}