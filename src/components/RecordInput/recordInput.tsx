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
        currentIndex: -1,
        history: []
    })
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }
    const handleSave = () =>{
        const newHistory = [...curState.current.history, inputValue]
        curState.current = {
            currentIndex: newHistory.length - 1,
            history: newHistory
        }
    }
    const handleUndo = () => {
        // never undo before
        if(curState.current.currentIndex === -1) {
            // undo to the last item of the histories array
            curState.current.currentIndex = curState.current.history.length - 1
        } else {
            curState.current.currentIndex--
        }
        setInputValue(curState.current.history[curState.current.currentIndex])
    }
    const handleRedo = () => {
        // can't redo when historyIndex is the last item or historyIndex is never moved
      if (curState.current.currentIndex === -1) {
        return
      }
      curState.current.currentIndex++;
      setInputValue(curState.current.history[curState.current.currentIndex])
    }
    return (<>
        <Input {...inputProps} value={inputValue} onChange={onChange} />
        <Button {...saveBtnProps} onClick={handleSave}>保存</Button>
        <Button {...undoBtnProps} onClick={handleUndo}>撤销</Button>
        <Button {...redoBtnProps} onClick={handleRedo}>重做</Button>
    </>)
}