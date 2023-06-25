import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
      <div style={{display:"flex", background:'', color:"", alignItems:'center',}}>
        <Link to='/' style={{textDecoration:'none'}} ><h1 style={{ marginLeft:'30px', }}>Movies App</h1></Link>
        <Link to='/favourites' style={{textDecoration:'none'}} ><h2 style={{ marginLeft:'30px', }}>Favourite</h2></Link>        
      </div>
    )
  }
}
