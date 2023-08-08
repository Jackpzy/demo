import * as React from "react";
import {
    DefaultButton,
    ITextField,
    Label,
    Stack,
    TextField,
    getTheme,
    mergeStyles,
} from "@fluentui/react";
import { TodoItems } from "./Todo.Items";

export const Todo: React.FunctionComponent = () => {
    const mainDivStyle = mergeStyles({
        minWidth: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    });
    const theme = getTheme();

    const [state, setState] = React.useState<ITodoState>({
        items: [],
    });
    const [inputVal, setInputVal] = React.useState<string>("");

    const addNewItem = () => {
        if (inputVal) {
            const newItem: TodoItem = {
                description: inputVal,
                isCompleted: false,
            };

            setState({
                items: [...state.items, newItem],
            });
        }
    };

    async function fetchData() {
        const response = await fetch('localhost:7126/api/hello/model');
        const data = await response.json();
        // 处理获取到的数据
        if (data) {
            const newItem: TodoItem = {
                description: inputVal,
                isCompleted: false,
            };

            setState({
                items: [...state.items, newItem],
            });
        }
      }

    const clearCompleted = () => {
        const newItems = state.items.filter((item) => !item.isCompleted);
        setState({
            items: newItems,
        });
    };

    return (
        <div className={mainDivStyle}>
            <Stack
                horizontal
                tokens={{
                    childrenGap: 10,
                }}
                styles={{
                    root: {
                        alignItems: "end",
                    },
                }}
            >
                <Label
                    styles={{
                        root: {
                            ...theme.fonts.xLarge,
                        },
                    }}
                >
                    Todos
                </Label>
                <Label
                    styles={{
                        root: {
                            ...theme.fonts.medium,
                        },
                    }}
                >
                    (1.7 final)
                </Label>
                <DefaultButton
                    styles={{
                        root: {
                            marginLeft: 10,
                            width: "50px",
                        },
                    }}
                    onClick={() => {
                        fetchData();
                    }}
                >
                    Hello
                </DefaultButton>
            </Stack>
            <Stack
                horizontal
                styles={{
                    root: {
                        minWidth: 400,
                        marginTop: 10,
                    },
                }}
            >
                <TextField
                    ariaLabel="new-todo"
                    styles={{
                        root: {
                            flexGrow: 1,
                        },
                    }}
                    onChange={(e, newVal) => {
                        setInputVal(newVal ?? "");
                    }}
                    value={inputVal}
                />
                <DefaultButton
                    styles={{
                        root: {
                            marginLeft: 10,
                            width: "50px",
                        },
                    }}
                    onClick={() => {
                        addNewItem();
                        setInputVal("");
                    }}
                >
                    Add
                </DefaultButton>
            </Stack>
            <TodoItems
                todos={state.items}
                onTodoChecked={(idx) => {
                    const newItems = [...state.items];
                    newItems[idx].isCompleted = !newItems[idx].isCompleted;
                    setState({
                        items: newItems,
                    });
                }}
                onClearCompleted={clearCompleted}
            />
        </div>
    );
};

export type TodoItem = {
    description: string;
    isCompleted: boolean;
};

interface ITodoState {
    items: TodoItem[];
}

export default Todo;
