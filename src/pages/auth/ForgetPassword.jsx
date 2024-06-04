import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ForgetPassword = () => {//! FALTA HACERLA ASYNC
  const formik = useFormik({//! HOOK DE REACT QUE DESCONOZCO (USAR OTROS HOOKS?)
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Email no válido").required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/password/forgetPassword`, values)//!CONTROLAR QUE LA RUTA ESTÉ BIEN ESCRITA
        .then((response) => {
          toast.success("Email enviado!");
        })
        .catch((error) => {
          if (error.response.status === 404) {
            toast.error("Email no encontrado");
          } else {
            toast.error("Error del servidor");
          }
        })
    },
  });

  return (
    // JSX for ForgetPassword component
    <>
    </>
  )
};

export default ForgetPassword;