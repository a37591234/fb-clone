import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { setLogin } from "../store/authSlice.js";
import { useLoginMutation } from "../store/api/authApi.js";
import { useEffect } from "react";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { data: loginData, isSuccess: isLoginSuccess, error: loginError }] = useLoginMutation();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password is too short").max(16, "Password is too long").required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = async (formValue) => {
    let { email, password } = formValue;
    await login({ email, password });
  };

  useEffect(() => {
    if (isLoginSuccess) {
      dispatch(setLogin({ token: loginData.token, user: loginData.user.name }));
      navigate("/");
    }
  });

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
            <Typography level="body2">Log in to continue.</Typography>
          </div>
          <div>
            <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={handleLogin}>
              <Form>
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
                <p style={{ color: "red" }}>{loginError && loginError.data.message}</p>
                <button type="submit" className="btn btn-primary btn-block">
                  Log in
                </button>
              </Form>
            </Formik>
          </div>
          <Typography endDecorator={<Link href="/register">Register</Link>} fontSize="sm" sx={{ alignSelf: "center" }}>
            Don&apos;t have an account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
};
