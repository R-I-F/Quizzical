import React from "react"
import { useState } from 'react'
import './App.css'
import he from "he"
import QuestionsAndAnswers from "./Questions.jsx"
import Answer from "./Answer"
import Startpage from "./Startpage"
import { nanoid } from 'nanoid'

function App() {
const [apiData, setApiData] = React.useState([]) // api data state
const [isStart, setIsStart] = React.useState(false)// start state
const [checkAns, setCheckAns]= React.useState(false)


  React.useEffect(()=>{
    if(isStart){
      fetch("https://opentdb.com/api.php?amount=5&difficulty=easy")
          .then(res => res.json())
          .then(data => {const modifiedData = data.results.map(function(item){
            const unshuffeledAnsArr = [
              he.decode(...item.incorrect_answers),
              he.decode(item.correct_answer)
            ]
            const shuffeledAnsArr = shuffleArray(unshuffeledAnsArr).map((ans)=>(
              {
                answer: ans,
                isClicked: false,
                id: nanoid(),
              }
            ))

            return {
              ...item,
              question: he.decode(item.question),
              answers : shuffeledAnsArr,// returns array of answer objects
              isAns : false,
              selectedId:"",
              correctAnsId:shuffeledAnsArr.find((ans)=>
              ans.answer === item.correct_answer).id
              } 
          })
          setApiData(modifiedData)
          })
  
    }
    }, [isStart]) 
  console.log(apiData)

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements at i and j
    }
    return array;
  }

  function toggleIsStart(){
    if(isStart){
      setApiData([])
      setCheckAns(false)
    }
    setIsStart((prevState) => !prevState)
  }

  function handleAnsClick(id) {
    setApiData((prevData) =>
      prevData.map((data) => {
        const clickedAnswer = data.answers.find((ans) => ans.id === id);
  
        if (!clickedAnswer) return data;
  
        const newAnswersArr = data.answers.map((ans) =>
          ans.id === clickedAnswer.id
            ? { ...ans, isClicked: !ans.isClicked,}
            : { ...ans, isClicked: false }
        );
        //check if each question is answered using .every()
        const isQuestionAns = data.answers.every((ans)=> 
        !ans.isClicked)
  
        return { 
          ...data, 
          answers: newAnswersArr, 
          isAns:isQuestionAns,  
          selectedId: isQuestionAns?clickedAnswer.id:""};
      })
    );
  }

  function handleCheckAns(){
    setApiData((prevData)=>{
      return prevData.map((item)=>{
        
        if(item.selectedId!==item.correctAnsId){
          const newAnsArr = item.answers.map((ans)=>
          ans.id === item.selectedId? {...ans, color:"red"}:
          ans.id === item.correctAnsId?{...ans, color:"green"}:
          ans
          )
          return {
            ...item,
            answers:newAnsArr
          }
        }
        else{
          const newAnsArr = item.answers.map((ans)=>
          ans.id === item.selectedId?{...ans, color:"green"}:ans
          )
          return {
            ...item,
            answers:newAnsArr
          }
        }
      })
    })
    setCheckAns(true)
  }

  const qAndAContainer = apiData.map((item)=> 
     <QuestionsAndAnswers 
      question= {item.question}
      answers= {item.answers.map((ans)=>
        {
        return(<Answer 
          classClicked = {ans.isClicked?"clicked":""}
          classCorrect = {checkAns && ans.color}
          value = {ans.answer}
          handleAnsClick = {() => handleAnsClick(event.target.id)}
          key = {ans.id}
          id = {ans.id}
        />)})}
      key = {nanoid()}
    />
    )

const checkArr = apiData.map((item)=>item.selectedId === item.correctAnsId?true:false)
const score = checkArr.reduce((count, currentItem)=>{
return currentItem?count+1:count
},0)
console.log(isStart)
if( isStart === true){
  return (
    <main>
      {apiData?.length && qAndAContainer}
      <div className="bottom-container">
        <button 
        className="btn-two"
        onClick = {checkAns? toggleIsStart  :handleCheckAns}
        >{checkAns? "Play again":"Check answers"}</button> 
        <p>{checkAns && `you scored ${score}/5 correct answers`}</p>
      </div>
    </main>
  )
}
else {
  return (
    <main>
      <Startpage 
      handleStartbtn = {toggleIsStart}
      />
    </main>
  )
}
}
export default App
