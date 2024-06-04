import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"

const ResetPassword = () => {

    const navigate = useNavigate()
    //const params = useParams()

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required("Required").min(6, "Too Short!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const { newPassword } = values;
      const token = window.location.pathname.split("/").pop();

      axios
        .post(`password/reset-password/${token}`, { newPassword })
        .then((response) => {
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/login")
          }, 3000);
        })
        .catch((error) => {
          toast.error("El enlace ha expirado");
        });
    },
  });

  return (
    // JSX for ResetPassword component
    <>
    </>
  );
};

export default ResetPassword;