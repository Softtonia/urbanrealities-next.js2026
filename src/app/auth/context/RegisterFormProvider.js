"use client";

import { createContext, useContext, useState } from "react";

const RegisterFormContext = createContext();

export const useRegisterForm = () => useContext(RegisterFormContext);

export const RegisterFormProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        firstName:'',
        lastName:'',
        userName: "",
        email: "",
        phone: "",
        role: "Owner",
        password: "",
        confirm_password:''
    });

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    console.log("formdata",formData)

    return (
        <RegisterFormContext.Provider value={{ formData, updateField }}>
            {children}
        </RegisterFormContext.Provider>
    );
};
