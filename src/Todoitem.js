import React, { useEffect, useState } from 'react'
import Tilt from 'react-tilt'

const Todoitem = ({ name, date, time, deleteItem, completed, id, toggleDone, countDownDate }) => {

    // const countDownDate = new Date(`${date} ${time === "" ? "00:00" : time}`).getTime();

    const calculateTimeLeft = () => {
        let now = new Date().getTime();
        let distance = countDownDate - now;
        let timeLeft = {};
        if (distance > 0) {
            timeLeft = {
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            }
        }
        return timeLeft
    }

    const [timeLeft, setTimeleft] = useState(calculateTimeLeft)

    useEffect(() => {
        setTimeout(() => {
            setTimeleft(calculateTimeLeft());
        }, 1000);
    });


    return (
        <Tilt className="tilt" options={{ perspective: 1800, scale: 1.1 }}>
            <div className="Todoitem" >
                <h3 className="todoName">{name}</h3>
                <div>
                    {(date !== "") ? <span>{timeLeft.days === 0 ? "Today" : `On ${date}`}</span> : <span />}
                    {(time !== "" && date !== "") ? <span> at {time}</span> : <span />}
                </div>
                {!completed && date !== "" ?
                    Object.keys(timeLeft).length === 0 ?
                        <div>You are past the date</div> :
                        <div>
                            {timeLeft.days === 0 ? <span></span> : <span> {timeLeft.days} day{timeLeft.days === 1 ? "" : "s"} </span>}
                            {timeLeft.hours === 0 ? <span></span> : <span>{timeLeft.hours} hour{timeLeft.hours === 1 ? "" : "s"} </span>}
                            {timeLeft.minutes === 0 ? <span></span> : <span>{timeLeft.minutes} minute{timeLeft.minutes === 1 ? "" : "s"} </span>}
                            <span> {timeLeft.seconds} second{timeLeft.seconds === 1 ? "" : "s"} remaining </span>
                        </div>
                    : <div></div>}
                <div className="buttonContainer">

                    <button onClick={toggleDone} id={id} className={`doneStatus${completed} Tilt-inner`} >
                        <span><i className="fas fa-check"></i></span>
                    </button>
                    <button onClick={deleteItem} id={id} className="deleteButton Tilt-inner"><span><i className="fas fa-trash-alt"></i></span></button>

                </div>
            </div>
        </Tilt>
    )
}

export default Todoitem
