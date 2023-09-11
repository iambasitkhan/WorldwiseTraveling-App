import { Outlet } from "react-router-dom";
import Logo from "./Logo";
import AppNav from "../components/AppNav";
import AppFooter from "./AppFooter";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <AppFooter />
    </div>
  );
}
