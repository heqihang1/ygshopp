import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import styles from './reg.module.scss'
import myAxios from '../../utils/regaxios'

export default class reg extends Component {
    state = {
        accountValue:'',
        passwordValue:'',
        phoneValue:'',
        CodeValue:'',
    }

    handleAccount=(e) => {
        this.setState({
            accountValue:e.target.value
        })
    }

    handlePassword=(e) => {
        this.setState({
            passwordValue:e.target.value
        })
    }
    
    handleCodeValue=(e)=>{
        this.setState({
            phoneValue:e.target.value
        })

        
    }
    ChangeCodeValue=(e) => {
        console.log(1)
        console.log(e.target.value)
        this.setState({
            CodeValue:e.target.value
        })
    }
    handleCode=(params) => {
        console.log(this.state.CodeValue)
        myAxios.get('getMobileCode',{
            params:{
                mobile:this.state.phoneValue
            }
        }).then((res)=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
    }
    goRegister=(params) => {
        myAxios.post('createUser',{
            mobile:this.phoneValue,
            username:this.accountValue,
            password:this.passwordValue,
            code:this.CodeValue
        })
    }
    
    
    
    render() {
        return (
            <div style={{height:'100vh',background:'#fff'}}> 
            <NavBar
            style={{marginBottom:'3.4rem'}}
            className={styles.topNav}
            >注册</NavBar>
                <div className={styles.regBox}>
                   <div className={styles.line}>
                        <label htmlFor="account">
                            用户名: 
                        </label>
                        <input type="text" name="" id="account" onChange={this.handleAccount} 
                        value={this.state.accountValue}/>
                   </div>
                <br/>
                    <div className={styles.line}>
                        <label htmlFor="password">
                            密码: 
                        </label>
                        <input type="password" name="" id="password" onChange={this.handlePassword} 
                        value={this.state.passwordValue}
                        />
                    </div>
                <br/>
                    <label htmlFor="code">
                    {/* value={this.state.cationCode} */}
                        <input type="text" name="" id="code" value={this.state.phoneValue} 
                        onChange={this.handleCodeValue}/>
                        {/* onClick={this.handleCode} */}
                        <button onClick={this.handleCode}>获取验证码</button>
                        
                    </label>
                    <br/>
                    <label htmlFor="cattionCode">
                        <input type="text" name="" id="cattionCode" value={this.state.CodeValue}
                        onChange={this.ChangeCodeValue}
                        />
                      &nbsp;&nbsp;&nbsp;  验证码
                    </label>
                </div>
                <button onClick={this.goRegister}>注册</button>
            </div>
        )
    }
}
