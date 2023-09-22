function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
    }

  return (
    <div className="number-box-div" onClick={props.holdDice}>
        <div className="number-box d-flex align-items-center justify-content-center" style={styles}>
        <span className="text-darkblue">{props.value}</span>
        </div>
    </div>
  )
}

export default Die