import React from 'react'
import { connect } from 'react-redux';

const Info = ({ info }) => <h1 className="info">{info}</h1>


const mapStateToProps = state => ({
  info: state.info,
})

export default connect(mapStateToProps)(Info)