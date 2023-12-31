"use client"
import React, { useState, useEffect } from "react";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { ContainerArrow } from "./ArrowUpElements";
import Link from "next/link";

export const ArrowUp = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <ContainerArrow style={{ display: isVisible ? "block" : "none" }}>
            <Link href="#" className="arrow-up-icon" onClick={scrollToTop}>
                <BsFillArrowUpSquareFill />
            </Link>
        </ContainerArrow>
    );
};
