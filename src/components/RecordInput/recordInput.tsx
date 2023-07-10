import React, { FC, useRef, useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { InputProps } from "../Input/input";
import { ButtonProps } from "../Button/Button";

interface RecordInputProps {
    initvalue?: string;
    inputProps?: InputProps;
    undoBtnProps?: ButtonProps;
    redoBtnProps?: ButtonProps;
    saveBtnProps?: ButtonProps;
}

export default function RecordInput(props: RecordInputProps) {
    const { inputProps = {}, redoBtnProps = {}, undoBtnProps ={}, saveBtnProps} = props;
    const [inputValue, setInputValue] = useState<string>(props.initvalue || '')
    const curState = useRef<{
        currentIndex: number;
        history: Array<string>
    }>({
        currentIndex: 0,
        history: []
    })
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    const handleSave = () =>{
        const newHistory = [...curState.current.history, inputValue]
        curState.current = {
            currentIndex: curState.current.currentIndex + 1,
            history: newHistory
        }
    }
    return (<>
        <Input {...inputProps} value={inputValue} onChange={onChange} />
        <Button {...saveBtnProps} onClick={handleSave}>保存</Button>
        <Button {...undoBtnProps}>撤销</Button>
        <Button {...redoBtnProps}>重做</Button>
    </>)
}