"use client";
import React from "react";
import Link from "next/link";
import "./projectBreadcrumb.css";
import { FaChevronRight } from "react-icons/fa";
import { useCity } from "@/utils/CityContext";
import { useProject } from "../../context/ProjectContext";


const ProjectBreadcrumb = () => {
    const developer = useProject();
    const { city } = useCity();
    return (
        <>
            <div className="breadcrumb-container">
                <div className="container">
                    <div className="details-breadcrum body-text-rg16">
                        <div className="left-breadcrumb m-0">
                            <Link className="" href="/">Home</Link>
                            <FaChevronRight />
                            {/* <Link className="ms-3" href="/newly-listed ">Newly Listed Properties</Link> */}
                            {/* <FaChevronRight /> */}
                            <span className="body-text-rg16 ms-3">{developer?.name} </span>
                            {developer?.city_name && developer?.state_name &&
                                <span className="body-text-rg16">in {developer.city_name} ,{developer.state_name}</span>
                            }
                        </div>
                        <div className="right-info  m-0">
                            <span className="body-text-rg16 me-1">Posted on : {developer.date}</span>
                            <FaChevronRight />
                            <span className="body-text-rg16 ms-3">Project ID : {developer.project_unique_id}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );

}

export default ProjectBreadcrumb
