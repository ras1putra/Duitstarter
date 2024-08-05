'use client';

import { useAppSelector } from "../store/hook";
import AuthNavbar from "@/components/navbar/AuthNavbar";
import NavBar from "@/components/navbar/NavBar";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  
  return (
    <>
      {isAuthenticated ? <NavBar /> : <AuthNavbar />}
      {children}
    </>
  );
}