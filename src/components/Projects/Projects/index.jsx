import React, { useState, useEffect } from "react";
import { Container } from "./ProjectsElements";
import { Background } from "@/src/components/GlobalWrapper/GlobalWrapperElements";
import { SliderComp } from "../Slider";
import { Zoom } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectTheme } from "@/app/GlobalRedux/Features/ThemeSlice";
import axios from "axios";
import { Loading } from "@/src/components";

const getProjects = async () => {
    try {
        let apiUrl;

        if (process.env.NODE_ENV === process.env.NEXT_PUBLIC_ENV_PRODUCTION) {
            apiUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL;
        } else {
            apiUrl = process.env.NEXT_PUBLIC_LOCAL_URL;
        }

        const response = await axios.get(`${apiUrl}/api/projects`, {
            headers: {
                "Cache-Control": "no-store",
            },
        });

        if (response.status !== 200) {
            throw new Error(
                "Something went wrong while fetching projects data"
            );
        }

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const Projects = () => {
    const { t } = useTranslation();
    const theme = useSelector(selectTheme);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { projects } = await getProjects();
                setProjects(projects);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        /* setTimeout(() => {
            fetchProjects();
        }, 1000); */

        fetchProjects();

    }, []);

    return (
        <Background theme={theme}>
            <Container className="container" id="projects">
                <Zoom triggerOnce>
                    <h1>
                        {t("projects.title")}{" "}
                        <span className="title">
                            {t("projects.titleComplement")}
                        </span>
                    </h1>
                    <p className="project-number">{t("projects.number", { number: projects.length })}</p>
                    <p>{t("projects.description")}</p>
                </Zoom>
                {loading ? (
                    <Loading />
                ) : (
                    <SliderComp data={projects} />
                )}
            </Container>
        </Background>
    );
};
