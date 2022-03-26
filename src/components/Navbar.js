import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex',backgroundColor:'blue'}}>
        <Link to="/" style={{textDecoration:'none'}}> <h1 style={{ padding:'2',color:'white'}}>Movies</h1></Link>
      <Link to="/fav" style={{textDecoration:'none'}}> <h4 style={{marginLeft:'2rem',marginTop:'1rem',color:'white'}}>Favorites</h4></Link>
     
      </div>
      
    )
  }
}

export default Navbar;
