"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  // Scroll Spy Listener
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((sec) => observer.observe(sec));
  }, []);

  // Navbar shrink on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-300
          ${scrolled ? "py-2 bg-white/70 shadow-sm" : "py-4 bg-white/40"}
        `}
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="text-xl font-bold text-blue-700">
            CyberSequace
          </Link>


          {/* Mobile Icon */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-black/5 transition"
          >
            {open ? (
              <HiX className="text-3xl text-blue-700" />
            ) : (
              <HiMenu className="text-3xl text-blue-700" />
            )}
          </button>
        </div>
      </nav>

      {/* FULLSCREEN MOBILE MENU */}
      <div
        className={`fixed inset-0 z-40 bg-[#0f172a]/90 backdrop-blur-xl flex flex-col items-center justify-center gap-10 
        transition-all duration-500
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
      >
      </div>
    </>
  );
}
