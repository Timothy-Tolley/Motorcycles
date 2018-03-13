import React from 'react'
import request from 'superagent'

class Moto extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      bikes: this.props.bikes
    }
    this.deleteMoto = this.deleteMoto.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.bikes !== nextProps) {
      this.setState({
        bikes: nextProps.bikes
      })
    }
  }

  deleteMoto (make) {
    request
      .post('http://localhost:3000/api/v1/deleteMoto')
      .send(make)
      .then(res => {
        this.setState({
          bikes: res.body.bikes
        })
      }
      )
  }

  render () {
    return (
      <div className='container'>
        {this.state.bikes.map(bike => {
          return (
            <div key={bike._id} className='containerCol'>
              <img src ={bike.img} alt={bike.model} className='bikeImg'/>
              <ul>
                <li>
                  {bike.make}
                </li>
                <li>
                  {bike.model}
                </li>
                <li>
                  {bike.year}
                </li>
                <li> {bike.tags && bike.tags.map(tag => {
                  return (
                    <p key={tag}>
                      {tag}
                    </p>
                  )
                })}
                </li>
                <li>
                  <button onClick={() => this.deleteMoto({'make': bike.make})}>delete</button>
                </li>
              </ul>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Moto
