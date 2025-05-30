import * as Yup from "yup";
export const EditValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Full name is required")
    .min(2, "Full name is too short"),
    birthdate: Yup.date()
    .required("Birth date is required")
    .max(new Date(), "Birth date cannot be in the future"),
});
