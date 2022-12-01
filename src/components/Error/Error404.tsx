import React from "react";
import styles from "./Error404.module.css"

export function Error404() {
    return (
        <div className={styles.error}>
            <h1>404</h1>
            <h2>OOPS! PAGE NOT FOUND!</h2>
        </div>
    );
}
