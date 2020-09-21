import React, { Component } from 'react'
import { NavBar, Icon ,Modal} from 'antd-mobile';
// import SearchContent from './search/SearchContent'
import stylels from './cart.module.scss'
import cartImg from './cartChe.jpg'
import {connect} from 'react-redux'

// import { , Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
const alert = Modal.alert;





 class cart extends Component {
    handleGoCart=(params) => {
        this.props.history.push('/category')
    }
    state = {
        cartContent:[],
        Totalprice:null,
        Selectall:true
    }
   
    //获取购物车物品
    componentDidMount(){
        let cartcont = JSON.parse(localStorage.getItem('carts'))
        if(!!cartcont){
            this.setState({
                cartContent:cartcont
            },()=>{
                console.log(this.state.cartContent=='[]')
            })
        }
        
    }
    //点击选中
    handleChoice=(index) => {
        let data = this.state.cartContent
        data[index].judge = !data[index].judge
        this.cartServe(data)
    }
    // 减一
    Sub(index){
        this.calculation(index,-1)
    }
    //加一 
    Add(index){
       this.calculation(index,1)
    }
     
    calculation(index,symbolNum){
        let data = this.state.cartContent
        if(symbolNum==1){
            data[index].num++
        }else{
            data[index].num--
        }

        if(data[index].num<=0){
            // data[index].num = 1
            //删除弹窗
            alert('删除商品', '你确定要删除吗?', [
                { text: '取消', onPress: () => {
                        data[index].num = 1
                        this.cartServe(data)
                    } 
                },
                { text: '删除', onPress: () =>{
                    data.splice(index,1)
                    this.cartServe(data)
                }},
            ])

        }else{
            this.cartServe(data)
        }
        
    }
    cartServe(data){
        console.log(1)
        this.setState({
            cartContent:data
        })
        localStorage.setItem('carts',JSON.stringify(data))
    }

    render() {
        return (
            <div  className={stylels.windowBox}>
                 <div className={stylels.TopContent}>
                    {/* 顶部标题 */}
                    <NavBar className={stylels.topTitle}
                     icon={<Icon type="left" />}
                     onLeftClick={() =>{
                        window.history.go(-1)
                    }}
                    >{this.props.title}</NavBar>
                    {/* 顶部标题结束 */}
                    {/* 搜索栏 */}
                    <div className={stylels.contentCart}>
                        {
                        !this.state.cartContent.length?
                        <div><div className={stylels.cartEmpty}>
                            <img src={cartImg}></img>
                        </div>

                        <div className={stylels.cartText} onClick={this.handleGoCart}>购物车空空如也去购物</div></div>:
                        // 有内容
                        <ul>
                            {
                                this.state.cartContent.map((v,index)=>{
                                return  <li className={stylels.lis} key={v.goods_id} >
                                            <div className={stylels.choiceBox}>
                                                {/* stylels.choice, */}
                                                <div className={v.judge?stylels.choice:''} onClick={this.handleChoice.bind(this,index)}>
                                                    <i className='icon-xuanze iconfont'> </i>
                                                </div>
                                                
                                            </div>
                                            <div className={stylels.thingContent}>
                                                <img src={v.goods_big_logo} alt=""/>
                                                <div className={stylels.rightCont}>
                                                    <div className={stylels.nameText}>{v.goods_name}</div>
                                                    <div className={stylels.priaceBox}>
                                                        <span className={stylels.priace}>
                                                            ￥{v.goods_price}
                                                        </span>
                                                        <span className={stylels.calculation}>
                                                            <span className={stylels.sub} onClick={this.Sub.bind(this,index)}>-</span>
                                                            <span>{v.num}</span>
                                                            <span className={stylels.add} onClick={this.Add.bind(this,index)}>+</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                })
                            }
                        </ul>
                        }
                    </div>
                </div>
                {/* 购买 */}
                <div className={stylels.buttomBox}>
                    <div className={this.state.Selectall?stylels.xzd:''}  >
                       <i className='icon-xuanze iconfont'> </i> 全选
                    </div>
                    <div className={stylels.heji}>
                        合计:￥{<span></span>}
                    </div>
                    <div className={stylels.qujies}>去结算（{<span>1</span>}）</div>
                </div>
            </div>
        )
    }
}
let mapStore = (state)=>{
    return{
        title:state.cartReducers.title
    }
}


export default connect(mapStore,null)(cart)