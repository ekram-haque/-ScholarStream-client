import React from "react";
import logo from "../../../public/scholarstrem-logo.png";

const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-primary text-secondary p-10 mb-3 rounded-t-xl">
        <aside>
          <img className="w-20 h-20 " src={logo} alt="" />
          <p>
            ScholarStream
            <br />
            Trusted for global scholarship, since 1992
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <aside className="bg-primary text-secondary p-5 mb-5 rounded-b-xl text-center ">
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by <strong>ScholarStream</strong> Ltd
        </p>
      </aside>
    </div>
  );
};

export default Footer;
