import React, {useEffect} from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {AppRootStateType, useAppDispatch} from "../../api/store";
import {loginTC} from "./auth-reducer";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {ROUTS} from "../../api/todolist-api";
import {setAppStatusAC} from "../../app/app-reducer";

export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(setAppStatusAC({status: "succeeded"}))
    }, [])

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
            captcha: ""
        },
        validate: (values: LoginDataType) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address ⚠'
            }

            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 3) {
                errors.password = "Password should be more 3 symbols ⚠"
            }
            return errors
        },
        onSubmit: (values: LoginDataType) => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    if (isLoggedIn) {
        return <Navigate to={ROUTS.DEFAULT}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField {...formik.getFieldProps("email")}
                                   label="Email"
                                   margin="normal"/>
                        {formik.errors.email &&
                            <div style={{color: "red"}}>
                                {formik.touched.email && formik.errors.email}
                            </div>}
                        <TextField {...formik.getFieldProps("password")}
                                   type="password"
                                   label="Password"
                                   margin="normal"

                        />
                        {formik.touched.password && formik.errors.password &&
                            <div style={{color: "red"}}>
                                {formik.errors.password}
                            </div>}
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox {...formik.getFieldProps("rememberMe")}
                                                             checked={formik.values.rememberMe}/>}
                        />
                        <Button type={'submit'} color={"secondary"} variant={"outlined"}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}

///----------- type -----------\\\
type FormikErrorType = {
    email?: string
    password?: string
}
export type LoginDataType = {
    email: string
    password: string,
    rememberMe: boolean,
    captcha: string
}