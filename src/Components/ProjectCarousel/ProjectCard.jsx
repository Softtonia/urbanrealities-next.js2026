"use client";
import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import "./ProjectCarousel.css";
import { formatprice } from "@/utils/formatprice";


const ProjectCard = ({ project, onViewProject }) => {

  // const customFields = project.custom_field_values.reduce((acc, field) => {
  //   acc[field.template.slug] = field.field_value;
  //   return acc;
  // }, {});
  console.log('==>', project?.["property_type "]?.map(val => val?.property_type_name)?.join(', '))
  const overview = project?.custom_field_values?.filter(
    (val) =>
      val?.template?.slug?.startsWith("overview") &&
      (val.template.slug.includes("tower")
        || val.template.slug.includes("units")
        || val.template.slug.includes("rera")
        || val.template.slug.includes("bhk")
        || val.template.slug.includes("launch")
        || val.template.slug.includes("brochure")
        || val.template.slug.includes("price")
        || val.template.slug.includes("rent")
      )) || [];
  console.log("overview", project)
  const tower = overview.find(val =>
    val.template.slug.includes("tower")
  )?.field_value;

  const units = overview.find(val =>
    val.template.slug.includes("units")
  )?.field_value;

  const rera = overview.find(val =>
    val.template.slug.includes("rera")
  )?.field_value;

  const bhk = overview.find(val =>
    val.template.slug.includes("bhk")
  )?.field_value;

  const ongoingPrice = overview.find(val =>
    val.template.slug.includes("price")
  )?.field_value;

  const heroSectionFields = project?.custom_field_values?.filter(
    (val) =>
      val?.template?.slug?.startsWith("herosection") &&
      (val.template.slug.includes("banner"))
  ) || [];


  const heroBanner = heroSectionFields.find(val =>
    val.template.slug.includes("banner")
  )?.field_value[0];
  const [imgSrc, setImgSrc] = React.useState(heroBanner || project.featured_image);

  const title = project.name || project.title || "Untitled Project";
  const propertyTypeName = project?.["property_type "] ? project?.["property_type "]?.map(val => val?.property_type_name)?.join(', ') : project?.selected_taxonomies?.find(t => t.taxonomy_slug === 'property-type')?.selected_terms?.map(t => t.name).join(', ');
  const statusName = project.property_status_id_name || project?.selected_taxonomies?.find(t => t.taxonomy_slug === 'property-status')?.selected_terms?.map(t => t.name).join(', ');
  const locationText = project.location?.full_address || [project.area_locality || project.location?.area_locality, project.city?.name || project.location?.city_name].filter(Boolean).join(', ');

  return (
    <div className="project-card" onClick={() => onViewProject(project)} style={{cursor: 'pointer'}}>
      <div className="project-card__image-wrapper" style={{position: 'relative'}}>
        <Image
          src={imgSrc || "/project-placeholder.png"}
          alt={title}
          width={400}
          height={338}
          className="project-card__image"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onLoadingComplete={(result) => {
            if (result.naturalWidth === 0) setImgSrc("/project-placeholder.png");
          }}
          onError={() => setImgSrc("/project-placeholder.png")}
          unoptimized
        />
        {statusName && (
          <span style={{position: 'absolute', top: '16px', left: '16px', backgroundColor: 'var(--Orange-Red, #ff6b35)', color: '#fff', padding: '6px 12px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold'}}>
            {statusName}
          </span>
        )}
      </div>

      <div className="project-carousel__content" style={{ display: 'flex', flexDirection: 'column', padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <h3 className="project-card__builder" style={{ fontSize: '24px', fontWeight: '700', color: '#333', margin: '0' }}>
            {title}
          </h3>
          {ongoingPrice && (
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--Orange-Red, #ff6b35)', textAlign: 'right' }}>
              ₹{formatprice(ongoingPrice)} <span style={{fontSize: '14px', color: '#666', fontWeight: 'normal', display: 'block'}}>Onwards</span>
            </div>
          )}
        </div>

        {project.developer && (
          <div style={{ fontSize: '14px', color: '#555', marginBottom: '16px', fontWeight: '500' }}>
            By <span style={{color: '#333'}}>{project.developer.name}</span>
          </div>
        )}

        {locationText && (
          <div style={{ fontSize: '15px', color: '#666', display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '24px' }}>
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--Orange-Red, #ff6b35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginTop: '2px'}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
             {locationText}
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: 'auto' }}>
          {Number(bhk) > 0 && (
             <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f9f9f9', padding: '8px 12px', borderRadius: '6px', fontSize: '14px', color: '#555', border: '1px solid #eee' }}>
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg>
               {bhk} BHK
             </div>
          )}
          {propertyTypeName && (
             <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f9f9f9', padding: '8px 12px', borderRadius: '6px', fontSize: '14px', color: '#555', border: '1px solid #eee' }}>
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path></svg>
               {propertyTypeName}
             </div>
          )}
          {project.reraNo && (
             <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f9f9f9', padding: '8px 12px', borderRadius: '6px', fontSize: '14px', color: '#555', border: '1px solid #eee' }}>
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"></path><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"></path></svg>
               RERA: {project.reraNo}
             </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
          <button
            className="btn-viewproject"
            style={{ padding: '10px 24px', fontSize: '15px', fontWeight: '600', borderRadius: '8px', backgroundColor: 'var(--Orange-Red, #ff6b35)', color: '#fff', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}
            onClick={(e) => { e.stopPropagation(); onViewProject(project); }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e55a2b'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--Orange-Red, #ff6b35)'}
          >
            View Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
