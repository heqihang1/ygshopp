import Axios from 'axios'
import React, { Component } from 'react'
import axios from 'axios'
export default class cs extends Component {
    handleClick=(params) => {
        axios.get('./getClassifyHome',{
            city_id:0
        }).then(res=>{
            console.log(res)
        })
    }
    
    render() {
        return (
            <div>
                <button onClick={this.handleClick}>点击</button>
            </div>
        )
    }
}
