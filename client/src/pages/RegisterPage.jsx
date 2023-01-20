import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRegisterMutation } from "../store/api/authApi.js";

export const RegisterPage = () => {
  const [register, { data: registerData, isSuccess: isRegisterSuccess, error: registerError }] = useRegisterMutation();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password is too short").max(16, "Password is too long").required("Password is required"),
    passwordConfirm: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const handleRegister = async (formValue) => {
    const { name, email, password } = formValue;
    await register({ name, email, password });
  };

  return (
    <CssVarsProvider>
      <main>
        <Sheet
          sx={{
            width: 300,
            mx: "auto",
            my: 4,
            py: 3,
            px: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body2">Register to continue.</Typography>
          </div>
          <div>
            <Formik initialValues={initialValues} validationSchema={RegisterSchema} onSubmit={handleRegister}>
              <Form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <Field name="name" type="text" className="form-control" />
                  <ErrorMessage name="name" component="div" className="alert alert-danger" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field name="email" type="text" className="form-control" />
                  <ErrorMessage name="email" component="div" className="alert alert-danger" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Field name="password" type="password" className="form-control" />
                  <ErrorMessage name="password" component="div" className="alert alert-danger" />
                </div>
                <div className="form-group">
                  <label htmlFor="confirm password">Confirm Password</label>
                  <Field name="passwordConfirm" type="password" className="form-control" />
                  <ErrorMessage name="passwordConfirm" component="div" className="alert alert-danger" />
                </div>
                <p style={{ color: "red" }}>{registerError && registerError.data.message}</p>
                <p style={{ color: "green" }}>{isRegisterSuccess && registerData.message}</p>
                <button type="submit" className="btn btn-primary btn-block">
                  Register
                </button>
              </Form>
            </Formik>
          </div>
          <Typography endDecorator={<Link href="/login">Login</Link>} fontSize="sm" sx={{ alignSelf: "center" }}>
            Already have an account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
};
