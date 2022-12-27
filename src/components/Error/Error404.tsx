import React, {useEffect} from "react";
import styles from "./Error404.module.css"
import {useAppDispatch} from "../../api/store";
import {setAppStatusAC} from "../../app/app-reducer";

export function Error404() {

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setAppStatusAC({status: "succeeded"}))
    }, [])

    return (
        <div className={styles.error}>
            <h1>404</h1>
            <h2>OOPS! PAGE NOT FOUND!</h2>
        </div>
    );
}
