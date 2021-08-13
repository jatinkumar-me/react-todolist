import React from 'react'


const ItemInput = ({ onSubmit, nameChange, timeChange, dateChange, name, date, time }) => {
    return (
        <div className="itemInput" >
            <input type="text" onInput={nameChange} value={name} placeholder="Enter todo" id="textInput"/>
            <input type="date" onInput={dateChange} value={date} />
            <input type="time" onInput={timeChange} value={time} />
            <button onClick={onSubmit} className="submitButton"><span>Add item</span></button>
        </div>
    )
}

export default ItemInput
