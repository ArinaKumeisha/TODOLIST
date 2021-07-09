import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle);
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem();
        }
    }
    const errorMessage = "Title required!"

    return (
        <div>


            <TextField                             //input
                label={"Title"}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                variant={"outlined"}
                error={error}
                helperText={errorMessage}/>

            <IconButton
                color={"primary"}
                size={"small"}
                onClick={addItem}>
                <AddBox/>
            </IconButton>

        </div>
    )
}

export default AddItemForm