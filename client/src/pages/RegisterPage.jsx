import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import TextField from "@mui/joy/TextField";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { useFormik } from "formik";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirm: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const RegisterPage = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
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
            <Typography level="body2">Register</Typography>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              required
              name="email"
              type="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              helperText={formik.touched.email && formik.errors.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            <TextField
              required
              name="password"
              type="password"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              helperText={formik.touched.password && formik.errors.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
            />
            <TextField
              required
              name="passwordConfirm"
              type="password"
              label="Confirm Password"
              value={formik.values.passwordConfirm}
              onChange={formik.handleChange}
              helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
              error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
            />
            <Button type="submit" sx={{ mt: 1 }}>
              Register
            </Button>
          </form>
          <Typography endDecorator={<Link href="/login">Login</Link>} fontSize="sm" sx={{ alignSelf: "center" }}>
            Already have an account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
};
