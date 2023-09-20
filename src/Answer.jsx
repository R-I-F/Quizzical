import React from "react"

export default function Answer(props){
    
    return (
        <p 
        className={`answers ${props.classClicked} ${props.classCorrect}`}
        onClick = {props.handleAnsClick}
        value = {props.value}
        id = {props.id}
        >
        {props.value}</p>
    )
}