import React, { Component } from 'react'
import styles from './login.module.scss'
import { NavBar, Icon } from 'antd-mobile';
import myaxios from '../../utils/regaxios'
export default class login extends Component {
    state={
        accountValue:'',
        passwordValue:'',
    }
    handleReg=(params) => {
        this.props.history.push('/register')
    }
    changeAccount=(e) => {
        // console.log(e.target.accountValue)
        this.setState({
            accountValue:e.target.value
        })
    }
    changePassword=(e) => {
        // console.log(e.target.value)
        this.setState({
            passwordValue:e.target.value
        })
    }
    handleLogin=(params) => {
        console.log(this.state.passwordValue)
        myaxios.post('loginCheck',{
                username:this.state.accountValue,
                password:this.state.passwordValue
        }).then((res)=>{
            console.log(res)
        }).catch(err=>console.log(err))
    }
    
    
    
    render() {
        return (
            <div style={{height:'100vh',background:'#fff'}}>
                <NavBar
                style={{background:'red'}}
                >登录</NavBar>

                <br/>
                <label htmlFor="account">
                    用户名:<input type="text" name="" id="account" 
                    onChange={this.changeAccount}
                    value={this.state.accountValue}
                    />
                </label>
                <br/>
                <label htmlFor="pass">
                    密码: <input type="password" name="" id="pass" 
                    onChange={this.changePassword}
                    value={this.state.passwordValue || ''}
                    />
                </label>
                <br/>
                <button onClick={this.handleLogin}>登录</button>
                <button onClick={this.handleReg}>注册</button>
            </div>
        )
    }
}
