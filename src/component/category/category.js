import React, { Component } from 'react'
import { NavBar } from "antd-mobile";
import stylels from '../index/index.module.scss';
import SearchContent from '../index/search/SearchContent';
import categoryls from './category.module.scss'
import myaxios from '../../utils/myaxios'
import './cate.css'
import axios from 'axios'
export default class category extends Component {
    state={
        // 左边列表
        categoryDate:[1,2,3],
        // 右边内容
        categoryCont:[],
        // 左边选择的标题
        select_index:0
    }
    constructor(props){
        super(props)
        const CancelToken = axios.CancelToken;
        this.source = CancelToken.source();
    }
    componentDidMount() {
        let storageData = JSON.parse(localStorage.getItem('storageshuju'))
        if(storageData){
            let currentTime = Date.now()
            let storageTime = storageData.time
            // 判断存储是否超过一小时
            if(currentTime- storageTime>60*60*1000){
                myaxios.get('/categories',{
                    cancelToken: this.source.token
                }).then((res)=>{
                    this.requestDate(res)
                })
            }else{
                this.setState({
                    categoryDate:storageData.go,
                    categoryCont:storageData.go[0].children
                })
            }
        }else{
            myaxios.get('/categories',{
                cancelToken: this.source.token
            }).then((res)=>{
                this.requestDate(res)
            })
        }
        
    }
    componentWillUnmount(){
        this.source.cancel('Operation canceled by the user.');
    }
    // 请求函数
    requestDate(res){
        let go = JSON.stringify({
            'go':res,
            time:Date.now()
        })
        localStorage.setItem('storageshuju',go)
        this.setState({
            categoryDate:res,
            categoryCont:res[0].children
        })
    }
    
    handleClass=(e) => {
        let num = e.target.getAttribute("data-index")
        this.setState({
            select_index: parseInt(num),
            categoryCont:this.state.categoryDate[num].children
        });
    }
    handleImg=(id)=>{
        console.log(id);
        this.props.history.push('/goodsLis?cid='+id)
    }
    
    render() {
        return (
            <div>
                <div className={stylels.TopContent}>
                    {/* 顶部标题 */}
                    <NavBar className={stylels.topTitle}>优购商城</NavBar>
                    {/* 顶部标题结束 */}
                    {/* 搜索栏 */}
                    <div>
                        <SearchContent></SearchContent>
                    </div>
                    {/* 搜索栏结束 */}
                </div>
                {/* 分类 */}
                    <div className={categoryls.contBox}>
                        <div className={categoryls.leftTitle} onClick={this.handleClass}>
                            {
                               this.state.categoryDate.map((val,i)=>{
                                return   <div key={i} className={categoryls.leftBox} data-index={i}>
                                            <div className={this.state.select_index==i?'leftText alicnColor':'leftText'} data-index={i}>{val.cat_name}</div>
                                        </div> 
                                })
                            }
                        </div>
                        <div className={categoryls.rightContent}>
                            {
                                this.state.categoryCont.map((val,i)=>(
                                    <div key={i}>
                                        <span className={categoryls.title}>/{val.cat_name}/</span>
                                        <div className={categoryls.boxClss}>
                                     
                                             {val.children && val.children.map((v,index)=>{
                                                return <div key={index} className={categoryls.ImgBox} onClick={this.handleImg.bind(this,v.cat_id)}>
                                                            <img src={v.cat_icon} data-index={v.cat_id}></img>
                                                            <span>{v.cat_name}</span>
                                                        </div>
                                            
                                            })}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                {/* 分类结束 */}
            </div>
        )
    }
}
