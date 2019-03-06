//Dependencies
import React, { Component } from 'react'
// import PropTypes from 'prop-types'

class Header extends Component {
  // static propTypes = {
  //   search: PropTypes.string.isRequired
  // }
  constructor(props){
    super(props)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }

  handleSearchSubmit(e){
    e.preventDefault()
    this.props.onSearchSubmit(this.query.value)
  }

  render(){
    return(
      <form onSubmit={this.handleSearchSubmit}>
        <input type="text" ref={node => this.query=node} defaultValue={this.props.search}/>
        <button type="submit">Buscar</button>
      </form>
    )
  }
}

export default Header