import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => setEditMode(true)

    const offEditMode = () => {
        if (title) {
            props.changeTitle(title)
        }else{
            setTitle(props.title)
        }
        setEditMode(false)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            offEditMode();
        }
    }

    return (
        editMode
            ? <TextField                    //инпут
                autoFocus={true}
                value={title}
                onBlur={offEditMode}
                onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}/>

            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}


export default EditableSpan;