import React, { Component } from 'react'
import myAxios from '../../utils/myaxios'
import axios from 'axios'
import { NavBar,Icon,Carousel,Toast} from 'antd-mobile';
import stylels from './goodsDetails.module.scss'
export default class goodsDetails extends Component {
    constructor(props){
        super(props);
        const CancelToken = axios.CancelToken
        this.CancelToken = CancelToken.source()

    }
    state={
        data:[],
        showhidden:false,
        imgHeight:276,
        // commodity:null,
        collection:null,
        handleColor:false,
        checkedAll:true
    }
    componentDidMount(){
        let getDate = localStorage.getItem('Collec')

        let goods_id = this.props.match.params.goods_id

        JSON.parse(getDate).map(v=>{
            if(v.goods_id==goods_id){
                this.setState({
                    handleColor:true
                })
                return false
            }
        })

        myAxios.get('/goods/detail/',{
            params:{
                goods_id:goods_id,
            }
        }).then((res)=>{
            this.setState({
                data:res,
                showhidden:true
            })
            
        })
        
    }
    componentWillUnmount(){
        // this.source.cancel('Operation canceled by the user.');
    }
    clickBanner=(params) => {
        
    }

    handleCollection=(params) => {
        // 获取数据
        let coll = JSON.parse(localStorage.getItem('Collec'))
        if(!!coll || coll=='[]'){
           let collsDate = coll.findIndex(v=>{
                return v.goods_id == params
           })
            //判断是否收藏了    
           if(collsDate!=-1){
                Toast.info('取消收藏', 2);
                coll.splice(collsDate,1)
                this.setState({
                    handleColor:false
                })
                localStorage.setItem('Collec',JSON.stringify(coll))
           }else{
                Toast.info('收藏成功', 2);
                this.setState({
                    handleColor:true
                })
                coll.push(this.state.data)
                localStorage.setItem('Collec',JSON.stringify(coll))
           } 
        }else{
            let collDate = []
            collDate.push(this.state.data)
            localStorage.setItem('Collec',JSON.stringify(collDate))
        }
    }
    shoppingCart=(goods_id) => {
        Toast.info('添加成功', 2);
        let getArr = JSON.parse(localStorage.getItem('carts'))
        //判断是否已经添加

        let objDate = this.state.data
        if(!!getArr || getArr=='[]'){
            let index = getArr.findIndex(v=>{
                return v.goods_id == goods_id
            })
            getArr.map(v=>{
                console.log(getArr,goods_id)
            })
            if(index==-1){
                objDate.num = 1
                objDate.judge = true
                getArr.push(objDate)
                localStorage.setItem("carts",JSON.stringify(getArr));
            }else{
                getArr[index].num++
                localStorage.setItem("carts",JSON.stringify(getArr));
            }
            
            
        }else{
            let arr = []
            objDate.num = 1
            objDate.judge = true
            arr.push(objDate)
            localStorage.setItem("carts",JSON.stringify(arr));
            // localStorage.setItem('Collec',JSON.stringify(collDate))
        }
    }
    shoppingVehicle=(params) => {
        this.props.history.push('/cart')
    }
    
    
    render() {
        return (
            <div>
                <div>
                    <NavBar
                    className={stylels.topTitle}
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() =>{
                        window.history.go(-1)
                    }}
                    >商品详情</NavBar>
                </div>
                <div className={stylels.banner}>
                <Carousel
                    autoplay={false}
                    infinite
                    className={stylels.bannerBoxImg}
                    >
                    {this.state.showhidden && this.state.data.pics.map(val => (
                        <div
                        onClick={this.clickBanner.bind(this,val.goods_id)}
                        key={val}
                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        className={stylels.bannerImg}
                        >
                        <img
                            src={val.pics_big}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                        />
                        </div>
                    ))}
                </Carousel>
                    
                </div>
                {/* 价格 */}
                <div className={stylels.priceNum}>
                    <div className={stylels.priceText}>￥{this.state.data.goods_price}</div>
                    <div className={stylels.rightIcon}>
                        <span>分享</span>
                        <span onClick={this.handleCollection.bind(this,this.state.data.goods_id)}
                              className={this.state.handleColor?stylels.handleColor:''}
                        >收藏</span>
                    </div>
                </div>
                {/* 说明 */}
                <div className={stylels.titleName}>
                    {this.state.data.goods_name}
                </div>
                {/* 图文详情 */}
                <div style={{fontSize:'0.48rem',marginBottom:' 0.266667rem'}}>图文详情</div>
                {/* 图片文字 */}
                <div
                dangerouslySetInnerHTML={{__html:this.state.data.goods_introduce}}
                >

                </div>
                {/* 底部购买 */}
                <div className={stylels.footerNav}>
                        <div className={stylels.lxkf}>
                            <i className='iconfont icon-lianxikefu'></i>
                            <span>联系客服</span>
                        </div>
                        <div className={stylels.gwc}>
                            <i className='iconfont icon-gouwuche'></i>
                            <span onClick={this.shoppingVehicle}>购物车</span>
                        </div>
                        <div className={stylels.jrgwc} onClick={this.shoppingCart.bind(this,this.state.data.goods_id)}>加入购物车</div>
                        <div className={stylels.ljgm}>立即购买</div>
                </div>
            </div>
        )
    }
}
