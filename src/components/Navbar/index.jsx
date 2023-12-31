"use client";
import React, { useEffect } from "react";
import { Container, NavLink, Flag } from "./NavbarElements";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import {
    selectCurrentLocale,
    setLocale,
} from "@/app/GlobalRedux/Features/LocaleSlice";
import { selectTheme, setTheme } from "@/app/GlobalRedux/Features/ThemeSlice";
import { i18nConfiguration } from "@/src/tools/initi18n";

const links = [
    { href: "/", label: "navbar.link.home" },
    { href: "/#skills", label: "navbar.link.skills" },
    { href: "/#projects", label: "navbar.link.projects" },
    { href: "/#testimonials", label: "navbar.link.testimonials" },
    { href: "/#contact", label: "navbar.link.contact" },
];

const USAflag = "/assets/flag/usa-flag.png";
const FRflag = "/assets/flag/france-flag.png";
const english = "en";
const french = "fr";

export const Navbar = ({ bar }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const currentLocale = useSelector(selectCurrentLocale);
    const theme = useSelector(selectTheme);


    const flagSrc = currentLocale === english ? FRflag : USAflag;

    useEffect(() => {
        if (flagSrc === USAflag) {
            i18nConfiguration.changeLanguage(french);
        } else {
            i18nConfiguration.changeLanguage(english);
        }
    }, [flagSrc, i18n]);

    const changeLocale = () => {
        const newLocale = currentLocale === english ? french : english;
        dispatch(setLocale(newLocale));
    };

    const changeTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        dispatch(setTheme(newTheme));
    };

    return (
        <Container bar={bar ? 1 : 0} theme={theme}>
            {links.map((link, index) => (
                <NavLink key={index} href={link.href} theme={theme}>
                    {t(link.label)}
                </NavLink>
            ))}

            <Flag
                loading="eager"
                className="language-flag"
                src={flagSrc}
                width={30}
                height={30}
                alt="flag"
                onClick={changeLocale}
            />
            {theme === "light" ? (
                <BsFillMoonFill className="theme-icon" onClick={changeTheme} />
            ) : (
                <BsFillSunFill className="theme-icon" onClick={changeTheme} />
            )}
        </Container>
    );
};
