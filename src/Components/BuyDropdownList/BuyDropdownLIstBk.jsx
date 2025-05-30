
"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BuyDropdownList from "./BuyDropdownLIstBk";
import RentDropdownList from "./RentDropdownList";
import Hamburger from "./Hamburger";
import add_home from "../../../public/add_home.svg"; 

export default function HeaderTwo({ setting, auth, handleLogout, HandleClick }) {
  const router = useRouter();

  return (
    <header className="bg-dark sticky-top py-3 z-3">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Link href="/">
            <a>
              <Image
                src={setting?.website_logo || "/default_logo.png"}
                alt="Logo"
                className="d-none d-md-block"
                width={100}
                height={40}
              />
              <Image
                src={setting?.mobile_logo || "/default_logo.png"}
                alt="Mobile Logo"
                className="d-block d-md-none"
                width={80}
                height={40}
              />
            </a>
          </Link>
          <button
            className="btn btn-link ms-3 p-0"
            onClick={HandleClick}
            style={{ border: "none", outline: "none" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
              <path
                d="M7.00296 7.75182C7.44227 7.75182 7.81713 7.61123 8.12754 7.33004C8.43795 7.04886 8.59315 6.71055 8.59315 6.31511C8.59315 5.91968 8.43696 5.58226 8.12458 5.30285C7.81154 5.02344 7.43569 4.88373 6.99704 4.88373C6.55839 4.88373 6.18353 5.02462 5.87246 5.3064C5.56205 5.58758 5.40685 5.92589 5.40685 6.32133C5.40685 6.71676 5.56304 7.05418 5.87542 7.33359C6.18846 7.613 6.56431 7.75271 7.00296 7.75271M7 16C4.68179 14.1548 2.93574 12.434 1.76184 10.8375C0.587279 9.24091 0 7.78793 0 6.4785C0 4.60018 0.67935 3.051 2.03805 1.83096C3.39741 0.610319 5.05139 0 7 0C8.94861 0 10.6026 0.610319 11.962 1.83096C13.3207 3.051 14 4.60018 14 6.4785C14 7.78793 13.413 9.24091 12.2391 10.8375C11.0646 12.434 9.31821 14.1548 7 16Z"
                fill="#ffffff"
              />
            </svg>
          </button>
        </div>

        <nav className="d-flex align-items-center">
          <ul className="nav gap-3 mb-0">
            <li className="nav-item dropdown">
              <span className="nav-link text-white dropdown-toggle" role="button" data-bs-toggle="dropdown">
                Buy
              </span>
              <ul className="dropdown-menu p-2 shadow">
                <BuyDropdownList />
              </ul>
            </li>
            <li className="nav-item dropdown">
              <span className="nav-link text-white dropdown-toggle" role="button" data-bs-toggle="dropdown">
                Rent
              </span>
              <ul className="dropdown-menu p-2 shadow">
                <RentDropdownList />
              </ul>
            </li>
            <li className="nav-item">
              <Link href="/find-agent"><a className="nav-link text-white">Find Agent</a></Link>
            </li>
            <li className="nav-item">
              <Link href="/all-projects"><a className="nav-link text-white">Projects</a></Link>
            </li>
            <li className="nav-item"><a className="nav-link text-white">Services</a></li>
            <li className="nav-item"><a className="nav-link text-white">Home Loans</a></li>
          </ul>

          <button
            onClick={() => router.push("/list-property")}
            className="btn btn-outline-light d-flex align-items-center ms-3"
          >
            <Image src={add_home} alt="Add Home" width={20} height={20} />
            <span className="ms-2">Post Property</span>
            <span className="badge bg-warning text-dark ms-2">Free</span>
          </button>

          <div className="d-flex align-items-center ms-4">
            <button onClick={() => router.push("/help")} className="btn btn-link text-white p-0 me-3">Help</button>
            <div className="vr me-3 text-white"></div>
            {auth?.isLoggedIn ? (
              <div className="dropdown">
                <span className="btn btn-link dropdown-toggle text-white p-0" data-bs-toggle="dropdown">
                  My Account
                </span>
                <ul className="dropdown-menu dropdown-menu-end shadow">
                  <li><Link href="/my-account"><a className="dropdown-item">Dashboard</a></Link></li>
                  <li><a className="dropdown-item">Message</a></li>
                  <li><a className="dropdown-item">Notifications</a></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>Log Out</button></li>
                </ul>
              </div>
            ) : (
              <button onClick={() => router.push("/login")} className="btn btn-link text-white p-0">Sign in</button>
            )}
          </div>
        </nav>

        <Hamburger />
      </div>
    </header>
  );
}
