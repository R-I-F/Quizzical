export default function Startpage(props){
    return (
        <div className="start-page">
            <h1>Quizzical</h1>
            <p>Quiz Time: Test Your Knowledge!</p>
            <button 
            className="btn-one"
            onClick= {props.handleStartbtn}
            >Start quiz</button>
        </div>
    )
}