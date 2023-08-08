import {
    Check,
    IStyle,
    Label,
    PrimaryButton,
    Stack,
    mergeStyles,
} from "@fluentui/react";
import React from "react";
import { todoTheme } from "./Theme";
import { TodoItem } from "./Todo";

interface ITodoItemsProps {
    todos: TodoItem[];
    onTodoChecked?: (idx: number, todo: TodoItem) => void;
    onClearCompleted?: () => void;
}

type TodoItemsState = {
    current: string;
};

export const TodoItems: React.FunctionComponent<ITodoItemsProps> = (props) => {
    const theme = todoTheme;
    const mainDivStyle = mergeStyles({
        marginTop: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        alignContent: "start",
        width: "100%",
    });
    const tabLinkStyle: IStyle = {
        ...theme.fonts.medium,
    };
    const highlightStyle: IStyle = {
        fontWeight: 600,
        borderBottom: "1px solid " + theme.palette.themePrimary,
    };

    const [state, setState] = React.useState<TodoItemsState>({
        current: "all",
    });
    const cntInComplete = React.useMemo(() => {
        return props.todos.filter((todo) => !todo.isCompleted).length;
    }, [props.todos]);

    const activeClassName = mergeStyles(tabLinkStyle, highlightStyle);
    const inactiveClassName = mergeStyles(tabLinkStyle);
    return (
        <div className={mainDivStyle}>
            <Stack
                horizontal
                tokens={{
                    childrenGap: 10,
                }}
            >
                <Label
                    className={
                        state.current === "all"
                            ? activeClassName
                            : inactiveClassName
                    }
                    onClick={() => setState({ current: "all" })}
                >
                    all
                </Label>
                <Label
                    className={
                        state.current === "active"
                            ? activeClassName
                            : inactiveClassName
                    }
                    onClick={() => setState({ current: "active" })}
                >
                    active
                </Label>
                <Label
                    className={
                        state.current === "completed"
                            ? activeClassName
                            : inactiveClassName
                    }
                    onClick={() => setState({ current: "completed" })}
                >
                    completed
                </Label>
            </Stack>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                }}
            >
                {props.todos.map((todo, idx) => {
                    return (
                        <Stack
                            key={idx}
                            horizontal
                            tokens={{
                                childrenGap: 10,
                            }}
                            styles={{
                                root: {
                                    alignItems: "center",
                                    display:
                                        (state.current === "active" &&
                                            todo.isCompleted) ||
                                        (state.current === "completed" &&
                                            !todo.isCompleted)
                                            ? "none"
                                            : undefined,
                                },
                            }}
                            onClick={() => props.onTodoChecked?.(idx, todo)}
                        >
                            <Check
                                checked={todo.isCompleted}
                                styles={{
                                    root: {
                                        border:
                                            ".5px solid " +
                                            theme.palette.themePrimary,
                                        cursor: "pointer",
                                    },
                                }}
                            ></Check>
                            <Label>{todo.description}</Label>
                        </Stack>
                    );
                })}
            </div>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Label
                    styles={{
                        root: {
                            ...theme.fonts.mediumPlus,
                        },
                    }}
                >
                    {cntInComplete} item left
                </Label>
                <PrimaryButton
                    onClick={() => {
                        if (props.onClearCompleted) {
                            props.onClearCompleted();
                        }
                    }}
                >
                    Clear Completed
                </PrimaryButton>
            </div>
        </div>
    );
};
