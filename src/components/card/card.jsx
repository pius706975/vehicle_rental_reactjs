import React from 'react'
import './card.css'
import { Link } from 'react-router-dom'

function Card(props) {
  return (
    <div className="col-lg-3 col-md-6">
      <Link to={'/vehicles/details/' + props.id} className="link-card">
        <div className="card card-popular">
          <img src={props.image} class="card-img-top" alt="..."></img>
        </div>
        <div className="card-content">
          <p className="card-title">{props.name}</p>
          <p className="card-text">{props.location}</p>
        </div>
      </Link>
    </div>
  )
}

export default Card
