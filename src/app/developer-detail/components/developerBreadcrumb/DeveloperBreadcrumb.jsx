"use client";
import React from "react";
import Link from "next/link";
import "./developerBreadcrumb.css";
import { FaChevronRight } from "react-icons/fa";
import { useDeveloper } from "../../context/DeveloperContext";
import { useCity } from "@/utils/CityContext";


const DeveloperBreadcrumb = () => {
    const developer = useDeveloper();
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
                            <span className="body-text-rg16 ms-3">Developer ID : {developer.developer_unique_id}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );

}

export default DeveloperBreadcrumb
