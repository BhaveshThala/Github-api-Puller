import React from 'react'
import './home.css'
function Repository(props) {
    return (
        <div className="col-sm-3">
            <div className="thumbnail repo">
                <img src="https://image.freepik.com/free-vector/loading-icon_167801-436.jpg" alt="Lights" />
                <h3>Repo Name:</h3>
                <h5>{props.name}</h5>
                <div class="caption">
                <a href={props.path} rel="noreferrer" target="_blank">View Repo</a>
                </div>
            </div>
        </div>
    )
}

export default Repository
