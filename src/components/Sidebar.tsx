"use client";
import React, { useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={styles.sidebar}
      style={{
        width: isOpen ? "280px" : "80px",
        transition: "width 0.8s ease-in-out",
      }}
    >
      

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className={styles.logoContainer}>
            <img src="/icons/logo.png" className={styles.logo} />
          </div>
          <div
            className={styles.appName}
            style={{
              visibility: isOpen ? "visible" : "hidden",
              opacity: isOpen ? 1 : 0,
              transition: "opacity 2s ease-in-out",
              marginLeft: "60px", // Spacing between logo and text
            }}
          >
            My-app
          </div>
        </div>

        {/* Home Icon with Text */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft:"7px",
            position:"absolute",
            top:"130px"
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: isOpen ? "10px" : "0", // Spacing between icon and text
              transition: "margin-right 0.8s ease-in-out",
              cursor:"pointer"
            }}
          >
            <HomeIcon style={{ color: "#000", fontSize: "24px" }} />
          </div>
          {isOpen && (
            <div
              style={{
                visibility: isOpen ? "visible" : "hidden",
                opacity: isOpen ? 1 : 0,
                transition: "opacity 2s ease-in-out",
                color:"white"

              }}

            >
              Home
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft:"7px",
            position:"absolute",
            top:"200px"
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: isOpen ? "10px" : "0", // Spacing between icon and text
              transition: "margin-right 0.8s ease-in-out",
              cursor:"pointer"
            }}
          >
            <DashboardIcon style={{ color: "#000", fontSize: "24px" }} />
          </div>
          {isOpen && (
            <div
              style={{
                visibility: isOpen ? "visible" : "hidden",
                opacity: isOpen ? 1 : 0,
                transition: "opacity 2s ease-in-out",
                color:"white",
              }}
            >
              Home
            </div>
          )}
        </div>
      </div>

      <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft:"7px",
            position:"absolute",
            bottom:"70px"
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: isOpen ? "10px" : "0", // Spacing between icon and text
              transition: "margin-right 0.8s ease-in-out",
              cursor:"pointer"
            }}
          >
            <AccountBalanceWalletIcon style={{ color: "#000", fontSize: "24px" }} />
          </div>
          {isOpen && (
            <div
              style={{
                visibility: isOpen ? "visible" : "hidden",
                opacity: isOpen ? 1 : 0,
                transition: "opacity 2s ease-out",
                color:"white",
                overflow:"hidden"
              }}
            >
              Connect Wallet
            </div>
          )}
        </div>
    </div>
  );
};

export default Sidebar;
