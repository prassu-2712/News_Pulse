import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title,description,imgurl,newsUrl,author,date}=this.props
    return (
      <div className='my-3'>
      
        <div className="card">
        <img src={!imgurl?"https://www.hindustantimes.com/ht-img/img/2024/06/18/1600x900/agni_v_missile_mirv_technology_1710215225853_1718672771624.png":imgurl} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} className="btn btn-dark">Read more</a>
            <p className="card-text"><small className="text muted">By {!author?"unknown":author} on {new Date(date).toGMTString}</small></p>
        </div>
        </div>
      </div>
    )
  }
}
export default Newsitem
