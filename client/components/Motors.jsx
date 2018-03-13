import React from 'react'
import request from 'superagent'

import Moto from './Moto'

class Motors extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      bikes: [],
      showMoto: false,
      make: '',
      model: '',
      year: '',
      img: '',
      tags: []
    }
    this.findMotos = this.findMotos.bind(this)
    this.submitBike = this.submitBike.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  findMotos (keyValue) {
    request
      .post('http://localhost:3000/api/v1/motors')
      .send(keyValue)
      .then(res => {
        this.setState({
          bikes: res.body.bikes,
          showMoto: true
        })
      })
  }

  submitBike (bike) {
    request
      .post('http://localhost:3000/api/v1/addMoto')
      .send(bike)
      .then(res => {
        this.setState({
          bikes: res.body.bikes,
          showMoto: true
        })
      })
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render () {
    return (
      <div className= 'fullContainer'>
        <h1>Motorbikes R Us </h1>
        <div className='input'>
          <button onClick={() => this.findMotos({'make': 'Kawasaki'})}>Kawasaki</button>
          <button onClick={() => this.findMotos({'tags': 'fun'})}>fun</button>
          <button onClick={this.findMotos.bind(null, {'tags': 'sweet'})}>sweet</button>
          <button onClick={() => this.findMotos({'year': 1984})}>1984</button>
          <button onClick={() => this.findMotos({})}>All</button>
        </div>
        <div className='container'>
          {this.state.showMoto && <Moto bikes = {this.state.bikes} />}
        </div>
        <div className='input'>
          <input name='make' placeholder='make' onChange={this.handleChange}/>
          <input name='model' placeholder='model' onChange={this.handleChange}/>
          <input name='year' placeholder='year' onChange={this.handleChange}/>
          <input name='img' placeholder='imgURL' onChange={this.handleChange}/>
          <input name='tags' placeholder='Tags Separated By Comma with quotes' onChange={this.handleChange}/>
          <button onClick={() => this.submitBike({
            'make': this.state.make,
            'model': this.state.model,
            'year': this.state.year,
            'img': this.state.img,
            'tags': [this.state.tags]
          })}> Submit Bike </button>
        </div>
      </div>
    )
  }
}

export default Motors
