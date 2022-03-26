import React, { Component } from 'react' ;
import {movies} from './Getmovies';
  // in jsx we use className not class as we don in html 
export default class banner extends Component {
  render() {
    let movie=movies.results[0]
    return (
    <>
        {
             movie=''?
             <div class="spinner-border text-primary" role="status">
             <span class="visually-hidden">Loading...</span>
                      </div>:

        <div className="card banner-style">
        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}   alt={movie.title} className="card-img-top banner-img"/>
        {/* <div class="card-body"> */}
          <h5 className="card-title banner-card-title">{movie.original_title}</h5>
          <p className="card-text banner-text">{movie.overview}</p>
          {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
        {/* </div> */}
       </div>
     }  
      </> 
    )
  }
}
