import { useState } from "react";
import { isNumber, isValidEmail } from "@/lib/utils";

/**
 * Validates form field inputs.
 *
 * @param {Object} defaultErrors - Initial error state.
 * @returns {{ errors: Object, validate: (target: string, value: any) => void }}
 */
const useFormValidate = (defaultErrors = {}) => {
  // Errors
  const [errors, setErrors] = useState(defaultErrors);

  const validate = (target: any, value: any) => {
    // Clear existing error for the target field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [target]: "",
    }));

    switch (target) {
      case "surname":
        if (!value) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [target]: "Surname cannot be empty",
          }));
        } else if (isNumber(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [target]: "Surname must be a string",
          }));
        }
        break;

      case "name":
        if (!value) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [target]: "Name cannot be empty",
          }));
        } else if (isNumber(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [target]: "Name must be a string",
          }));
        }
        break;
        if (!value) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            contact_dial_code: "Contact country code cannot be empty",
          }));
        }
        break;

      case "contact":
        if (!value) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            contact: "Contact cannot be empty",
          }));
        }
        break;
        
      case "email":
        if (!value) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Email cannot be empty",
          }));
        } else if (value.length <= 0) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Enter your email address",
          }));
        } else if (!isValidEmail(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Please enter a valid email address",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "",
          }));
        }
        break;
    }
  };

  return { errors, validate };
};

export default useFormValidate;
