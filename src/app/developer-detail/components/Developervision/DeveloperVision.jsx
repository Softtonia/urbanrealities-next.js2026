'use client';
import React from "react";
import styles from "./DeveloperVision.module.css";
import { useDeveloper } from "../../context/DeveloperContext";

const DeveloperVision = () => {
    const developer = useDeveloper();
    console.log("Developer in Stats:", developer);

    // ✅ Filter all repeater fields related to builder (vision, mission, values, chairman message)
    const builderFields = developer?.repeater_fields?.filter(
        (val) =>
            val?.template?.slug?.startsWith("builder") &&
            (val?.template?.slug.includes("vision") ||
                val?.template?.slug.includes("values") ||
                val?.template?.slug.includes("chairman-message") ||
                val?.template?.slug.includes("mission"))
    ) || [];

    // ✅ Extract individual fields
    const chairmanMessage = builderFields.find((val) =>
        val?.template?.slug.includes("chairman-message")
    )?.field_value;

    const vision = builderFields.find((val) =>
        val?.template?.slug.includes("vision")
    )?.field_value;

    const mission = builderFields.find((val) =>
        val?.template?.slug.includes("mission")
    )?.field_value;

    const values = builderFields.find((val) =>
        val?.template?.slug.includes("values")
    )?.field_value;

    

    return (
        <>
            {(chairmanMessage || vision || mission || values) &&
                <div className={styles.statssection}>
                    <div className={styles.header}>
                        {/* Chairman Message */}
                        {chairmanMessage && (
                            <>
                                <div className={styles.title}>Chairman Message</div>
                                <div
                                    className={styles.description}
                                    dangerouslySetInnerHTML={{ __html: chairmanMessage }}
                                />
                                <hr className={styles.divider} />
                            </>
                        )}

                        {/* Vision */}
                        {vision && (
                            <>
                                <div className={styles.title}>Vision</div>
                                <div
                                    className={styles.description}
                                    dangerouslySetInnerHTML={{ __html: vision }}
                                />
                                <hr className={styles.divider} />
                            </>
                        )}

                        {/* Mission */}
                        {mission && (
                            <>
                                <div className={styles.title}>Mission</div>
                                <div
                                    className={styles.description}
                                    dangerouslySetInnerHTML={{ __html: mission }}
                                />
                                <hr className={styles.divider} />
                            </>
                        )}

                        {/* Values */}
                        {values && (
                            <>
                                <div className={styles.title}>Values</div>
                                <div
                                    className={styles.description}
                                    dangerouslySetInnerHTML={{ __html: values }}
                                />
                            </>
                        )}
                    </div>
                </div>
            }
        </>
    );
};

export default DeveloperVision;
