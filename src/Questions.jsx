import React from "react";

export default function QuestionsAndAnswers (props){
    return <div 
    className="component"
    >
    <h2>{props.question}</h2>
    <div className="answers-container">{props.answers}</div>
    <hr className="horizontal-rule"/>
    </div>
}