"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, NavLink, Flag } from "./NavbarElements";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import {
    setCurrentUser,
    selectCurrentUser,
    selectUserIsLoggedIn,
} from "@/src/redux/slices/user/UserSlice";
import { FaUserAlt } from "react-icons/fa";

import {
    selectCurrentLocale,
    setLocale,
} from "@/src/redux/slices/locale/LocaleSlice";
import { selectTheme, setTheme } from "@/src/redux/slices/theme/ThemeSlice";

const links = [
    { href: "/", label: "navbar.link.home" },
    { href: "/#skills", label: "navbar.link.skills" },
    { href: "/#projects", label: "navbar.link.projects" },
    { href: "/#testimonials", label: "navbar.link.testimonials" },
    { href: "/#footer", label: "navbar.link.contact" },
    { href: "/cv", label: "navbar.link.cv" },
    { href: "/snake", label: "navbar.link.game" },
];

const USAflag = "assets/flag/usa-flag.png";
const FRflag = "assets/flag/france-flag.png";
const english = "en";
const french = "fr";

export const Navbar = ({ bar }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const currentLocale = useSelector(selectCurrentLocale);
    const theme = useSelector(selectTheme);
    const [userData, setUserData] = useState(null);
    const userInformation = useSelector(selectCurrentUser);
    const userIsLoggedIn = useSelector(selectUserIsLoggedIn);

    const flagSrc = currentLocale === english ? FRflag : USAflag;

    useEffect(() => {
        if (flagSrc === USAflag) {
            i18n.changeLanguage(french);
        } else {
            i18n.changeLanguage(english);
        }
    }, [flagSrc, i18n]);

    // Make sure to only fetch user data if user is logged in if userInformation is null
    useEffect(() => {
        console.log(
            "USER INFORMATION LOADED FROM REDUX IN NAVBAR",
            userInformation
        );
        if (userInformation === null && userIsLoggedIn === true) {
            const getUserDetails = async () => {
                const res = await axios.get("/api/me");
                console.log("res.data.data", res.data.data);
                dispatch(setCurrentUser(res.data.data));
            };

            getUserDetails();
        }

        setUserData(userInformation);
    }, [userInformation, userIsLoggedIn]);

    const changeLocale = () => {
        const newLocale = currentLocale === english ? french : english;
        dispatch(setLocale(newLocale));
    };

    const changeTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        dispatch(setTheme(newTheme));
    };

    console.log("USER DATA IN NAVBAR", userInformation);

    return (
        <Container bar={bar ? 1 : 0} theme={theme}>
            {links.map((link, index) => (
                <NavLink key={index} href={link.href} theme={theme}>
                    {t(link.label)}
                </NavLink>
            ))}

            {userData ? (
                <NavLink href="/profile" theme={theme}>
                    <div className="container-profile-account">
                        <span className="user-icon">
                            <FaUserAlt />
                        </span>{" "}
                        <span className="user-fullname">
                            {userData.fullname}
                        </span>
                    </div>
                </NavLink>
            ) : null}

            <Flag
                className="language-flag"
                src={flagSrc}
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
