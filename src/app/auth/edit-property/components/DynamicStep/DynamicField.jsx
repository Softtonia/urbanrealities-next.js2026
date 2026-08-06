"use client";
import React, { useContext, useEffect, useState } from "react";
import { PostPropertyContext } from "@/app/auth/edit-property/context/PostPropertyContext";
import Select from "react-select";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import styles from "../steps/Basic-DetailsSteps.module.css"; 
import { Upload } from "antd";
import { FiUploadCloud } from "react-icons/fi";

const { Dragger } = Upload;

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "1px solid #9E9E9E",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "none",
    outline: "none",
    fontSize: "clamp(14px, 1.5vw, 16px)",
    fontFamily: "var(--font-regular)",
    "&:hover": {
      border: "1px solid #9E9E9E",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "clamp(12px, 1.5vw, 14px)",
    fontFamily: "var(--font-regular)",
    backgroundColor: state.isSelected
      ? "#fff"
      : state.isFocused
        ? "#f0f0f0"
        : "#fff",
    color: "#000",
    cursor: "pointer",
    ":active": {
      backgroundColor: "#f0f0f0",
      color: "#000",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "clamp(12px, 1.5vw, 14px)",
    fontFamily: "var(--font-regular)",
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
};

export default function DynamicField({ field, error }) {
  const { formData, updateFormData } = useContext(PostPropertyContext);
  const { token } = useSiteSettings();
  const [selectOptions, setSelectOptions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const { 
    request_key, 
    label, 
    type, 
    required, 
    placeholder, 
    options,
    options_api,
    depends_on,
    multiple 
  } = field;

  const value = formData.dynamicData?.[request_key] || 
    (type === 'media' ? formData.dynamicData?.['featured-image'] : 
    (type === 'gallery' ? formData.dynamicData?.['gallery'] : ""));
  const dependencyValue = depends_on ? formData.dynamicData?.[depends_on] : null;

  useEffect(() => {
    const fetchOptions = async () => {
      if (options && Array.isArray(options) && options.length > 0) {
        setSelectOptions(options.map(opt => ({ label: opt.label || opt, value: opt.value || opt })));
        return;
      }

      if (!options_api || !token) return;

      // Resolve options_api endpoint mapping
      let endpoint = "";
      if (options_api === "countries") {
        endpoint = "/api/post-property/location/country";
      } else if (options_api.includes("states/") && dependencyValue) {
        endpoint = `/api/post-property/location/state/${dependencyValue}`;
      } else if (options_api.includes("cities/") && dependencyValue) {
        endpoint = `/api/post-property/location/city/${dependencyValue}`;
      } else if (depends_on && !dependencyValue) {
        setSelectOptions([]); // Wait for dependency
        return;
      } else {
        // fallback generic resolve if they have standard api
        endpoint = `/api/frontend/${options_api.replace(/\{.*\}/, dependencyValue)}`;
      }

      if (!endpoint || endpoint.includes('undefined')) return;

      setIsFetching(true);
      try {
        const res = await fetch(endpoint, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        
        const list = Array.isArray(data) ? data : (data?.data || []);
        setSelectOptions(list.map(item => ({
          label: item.name || item.label || item.title,
          value: item.id || item.value
        })));
      } catch (err) {
        console.error("Failed to fetch options for", request_key, err);
      } finally {
        setIsFetching(false);
      }
    };
    
    if (type === "select") {
      fetchOptions();
    }
  }, [options_api, dependencyValue, token, type, options, request_key]);

  const handleChange = (e) => {
    const val = e?.target ? e.target.value : e;
    
    const newDynamicData = { ...formData.dynamicData, [request_key]: val };
    
    // If changing a parent select, clear the child selects
    if (type === "select" && request_key === "country_id") {
      newDynamicData.state_id = "";
      newDynamicData.city_id = "";
    } else if (type === "select" && request_key === "state_id") {
      newDynamicData.city_id = "";
    }

    updateFormData("dynamicData", newDynamicData);
  };

  const renderInput = () => {
    const inputClass = `form-control ${error ? "is-invalid border-danger" : ""}`;

    switch (type) {
      case "text":
      case "number":
      case "email":
        return (
          <input 
            type={type} 
            className={inputClass} 
            placeholder={placeholder || `Enter ${label}`} 
            value={value}
            onChange={handleChange}
            required={required}
          />
        );
      case "textarea":
        return (
          <textarea 
            className={inputClass} 
            placeholder={placeholder || `Enter ${label}`} 
            value={value}
            onChange={handleChange}
            required={required}
            rows={4}
          />
        );
      case "select":
        const selectedValue = selectOptions.find(opt => 
          String(opt.value) === String(value) || 
          (typeof value === 'string' && opt.label?.toLowerCase() === value.toLowerCase())
        ) || null;
        const selectStyles = {
          ...customStyles,
          control: (provided, state) => ({
            ...customStyles.control(provided, state),
            borderColor: error ? "var(--bs-danger)" : "#9E9E9E",
          })
        };
        return (
          <Select filterOption={(option, inputValue) => { if (!inputValue) return true; return option.label.toLowerCase().startsWith(inputValue.toLowerCase()); }}
            options={selectOptions}
            value={selectedValue}
            onChange={(selected) => handleChange(selected ? selected.value : "")}
            placeholder={placeholder || `Select ${label}`}
            styles={selectStyles}
            instanceId={request_key}
            isClearable
            noOptionsMessage={() => isFetching ? `Loading ${label.toLowerCase()}...` : `No ${label.toLowerCase()} found`}
            classNamePrefix="react-select"
          />
        );
      case "richtext":
        return (
          <textarea 
            className={inputClass} 
            placeholder={`Rich text placeholder for ${label}`}
            value={value}
            onChange={handleChange}
            required={required}
            rows={6}
          />
        );
      case "media":
      case "gallery":
        const isSingle = type === "media" || !multiple;

        const uploadProps = {
          multiple: !isSingle,
          maxCount: isSingle ? 1 : undefined,
          beforeUpload: (file) => {
            return false; // Prevent automatic upload
          },
          onChange: (info) => {
            let newFileList = info.fileList;
            if (isSingle) {
              newFileList = newFileList.slice(-1);
            }
            const files = newFileList.map(f => f.originFileObj || (f instanceof File ? f : null)).filter(Boolean);
            handleChange(isSingle ? (files[0] || "") : files);
          },
          fileList: (Array.isArray(value) ? value : (value && typeof value !== 'string' ? [value] : (typeof value === 'string' && value !== '' ? [value] : [])))
            .filter(f => f && f !== "") // Remove null, undefined, or empty strings
            .map((file, index) => {
            const isString = typeof file === 'string';
            const objectUrl = file instanceof File ? URL.createObjectURL(file) : null;
            
            const fileUrl = isString ? file : (objectUrl || file.url || file.preview);
            const fileName = file.name || file.file_name || (isString ? file.split('/').pop() : `file-${index}`);
            const fileUid = file.uid || file.id ? String(file.id) : String(index);

            return {
              uid: fileUid,
              name: fileName,
              status: 'done',
              originFileObj: isString ? null : (file instanceof File ? file : null),
              url: fileUrl,
              thumbUrl: fileUrl,
            };
          }),
        };

        return (
          <div className={error ? "border border-danger rounded" : ""}>
            <style>{`
              .spaced-dragger .ant-upload-list,
              .spaced-dragger div[class*="ant-upload-list"] {
                margin-top: 12px !important;
                margin-bottom: 20px !important;
              }
            `}</style>
            <div className="spaced-dragger">
              <Dragger {...uploadProps} listType="picture-card">
              <p className="ant-upload-drag-icon d-flex justify-content-center mb-2">
                <FiUploadCloud size={48} color="var(--Orange-Red)" />
              </p>
              <p className="ant-upload-text fw-semibold">Click or drag {label.toLowerCase()} to this area to upload</p>
              <p className="ant-upload-hint text-muted px-2">
                Support for a single or bulk upload. You can select multiple files if allowed.
              </p>
              </Dragger>
            </div>
          </div>
        );
      default:
        return (
          <input 
            type="text" 
            className={inputClass} 
            placeholder={`Enter ${label}`} 
            value={value}
            onChange={handleChange}
            required={required}
          />
        );
    }
  };

  return (
    <div className="mb-3">
      <label className={`${styles.subPara} d-block`}>
        {label} {required && <span className="text-danger">*</span>}
      </label>
      {renderInput()}
      {error && <div className="text-danger mt-1" style={{ fontSize: '0.875em' }}>{error}</div>}
    </div>
  );
}
