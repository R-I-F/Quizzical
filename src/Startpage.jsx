export default function Startpage(props){
    return (
        <div className="start-page">
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <button 
            className="btn-one"
            onClick= {props.handleStartbtn}
            >Start quiz</button>
        </div>
    )
}