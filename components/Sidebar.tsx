"use client";



import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";


import {useState , useEffect } from 'react'

export default function Sidebar() {
    const pathname = usePathname();
    const [active, setActive] = useState("home");

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
        return () => observer.disconnect();
    }, []
);
const navItems = [
    {
        href: "/",
        label: "Dashboard",
        icon: HiOutlineSquares2X2 , 
        active: active === "home",
        id: "dashboard"
    },

    {
        href: "/cases",
        label: "Cases",
        icon: HiOutlineSquares2X2 , 
        active: active === "home",
        id: "cases"
    },

    {
        href: "/tindakan",
        label: "Actions",
        icon: HiOutlineSquares2X2 , 
        active: active === "home",
        id: "suspects"
    },


    {
        href: "/victims",
        label: "Victims",
        icon: HiOutlineSquares2X2 , 
        active: active === "home",
        id: "victims"
    }
]
  return (
    <>
        <aside className="
        left-0
        fixed
        md:flex
        top-[190px]


        flex-col items-center justify-center
        gap-10 md:gap-12

        z-[999]
        
        ">
            {navItems.map((item)=> {
                const isAvtive = 
                item.href.startsWith("#")
                ? active === item.id
                : pathname === item.href;
                return (
                    <Link
                    href={item.href}
                    key={item.href}
                    className={`${
                        isAvtive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    } group flex items-center rounded-md px-2 py-2 text-sm font-medium`}
                    >
                        <item.icon
                        className={`${
                            isAvtive
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500"
                        } mr-3 h-100% w-6 shrink-0`}
                        aria-hidden="true"
                        />
                        {item.label}
                    </Link>
                )
            }) }
        </aside>
    </>
  )
}
