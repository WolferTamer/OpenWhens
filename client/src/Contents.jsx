
function Contents (props) {
    return <div className="contents-div">
        <div className="contents-paper" onClick={props.onclose}>
            {props.children}
        </div>
    </div>
}

export default Contents