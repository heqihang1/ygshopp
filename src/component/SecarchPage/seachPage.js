import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import stylels from './secarch.module.scss';
import { SearchBar} from 'antd-mobile';
import myAxiox from '../../utils/myaxios'
export default class seachPage extends Component {
    state={
        value:'',
        cartList:[]
    }
    onChange=(params) => {
        this.setState({
            value:params
        })
        
    }
    handleClickGo=(goods_id) => {
        console.log(goods_id)
        this.props.history.push('/details/'+goods_id)
        // console.log(1);
        
        
    }
    
    render() {
        return (
            <div>
                <div className={stylels.topNav}>
                    <div>
                        <NavBar
                        className={stylels.topTitle}
                        mode="dark"
                        icon={<Icon type="left" />}
                        onLeftClick={() =>{
                            window.history.go(-1)
                        }}
                        >搜索中心</NavBar>
                    </div>
                    <div>
                    <SearchBar
                        value={this.state.value}
                        placeholder="Search"
                        cancelText='搜索'
                        onCancel={() =>{
                            myAxiox.get('goods/qsearch/',{
                                params:{
                                    query:this.state.value
                                }
                            }).then((res)=>{
                                this.setState({
                                    cartList:res
                                })
                                
                            }).catch(err=>{
                                console.log(err);
                                
                            })
                            
                        }}
                        showCancelButton
                        onChange={this.onChange}
                        onFocus={() => console.log('onFocus')}
                    />
                    </div>
                </div>
                        
                <div className={stylels.contBox}>
                    <ul>
                        {this.state.cartList.map((v,i)=>{
                            return <li key={i} className={stylels.NavContent}>
                                            <div onClick={this.handleClickGo.bind(this,v.goods_id)}>
                                                <img src='./image/Snipaste.png'></img>
                                                <span>{v.goods_name}</span>
                                            </div>
                                    </li>
                        })}
                    </ul>
                </div>  
            </div>
        )
    }
}
