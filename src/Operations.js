import React from 'react'

const Operations = ({searchField, onSearchChange, sort, hideDone, sortMethod}) => {
    return (
        <div className = "operationBar">
            <div className="searchBox">
                <input id="searchInput" type="text" placeholder="Search" value={searchField} onInput={onSearchChange}/>
                <label htmlFor="cars"><i className="fas fa-search"></i></label>
            </div>
            
            <select name="sortBy" id="sortBy" onChange={sort} value={sortMethod}>
                <option value="dateAdded">Date Added</option>
                <option value="name">A-Z</option>
                <option value="timeRemaining">Time Remaining</option>
            </select>
            {/* <i className="fas fa-sort-alpha-down sortAZ"></i>
            <i className="fas fa-sort-alpha-down-alt sortZA"></i>
            
            <button onClick={hideDone}>Hide done <i className="fas fa-filter"></i></button> */}
        </div>
    )
}

export default Operations
