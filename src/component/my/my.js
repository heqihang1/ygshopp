import React, { Component } from 'react'

export default class my extends Component {
    handleReg=(params) => {
        this.props.history.push('./login')
    }
    
    render() {
        return (
            <div style={{height:'100vh',background:'#fff'}}>
                <button onClick={this.handleReg}>登录</button>
            </div>
        )
    }
    subimet(){
        console.log(1);
    }
}
