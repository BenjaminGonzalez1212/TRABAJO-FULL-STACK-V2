import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";

export default function ProtectedRoute() {
    const auth = useAuth()

    return auth.isAuthenticated ? <Outlet /> : <Navigate to = "/TRABAJO-FULL-STACK-V2/app"/>
//esto lo voy a usar para el tema de admin
}