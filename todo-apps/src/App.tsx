import React from "react";
import * as TodoComponents from "./Todo";
import { ThemeProvider, mergeStyles } from "@fluentui/react";
import { todoTheme } from "./Theme";

export const App: React.FunctionComponent = () => {
    const mainDivStyle = mergeStyles({
        width: "100%",
        minHeight: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    });

    return (
        <ThemeProvider theme={todoTheme} className={mainDivStyle}>
            <TodoComponents.Todo />
        </ThemeProvider>
    );
};
