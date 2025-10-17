import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../main";

export default function ProtectedRoute() {
    const auth = useAuth()

    return auth.isAuthenticated ? <Outlet /> : <Navigate to = "/app" />
//esto lo voy a usar para el tema de admin
}