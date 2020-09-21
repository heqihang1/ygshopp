import React, { Component } from 'react'
import { NavBar, Icon ,Carousel } from 'antd-mobile';
import stylels from './index.module.scss';
import SearchContent from './search/SearchContent'
import myaxios from '../../utils/myaxios'
import axios from 'axios'

// import Axios from 'axios'
export default class index extends Component {
    state = {
        data: [],
        listCategory:[],
        img_list:[]
    }
    constructor(props){
        super(props)
        const CancelToken = axios.CancelToken;
        this.source = CancelToken.source();
    }
    componentDidMount() {
       
        //获取轮播图
        myaxios.get('home/swiperdata',{
            cancelToken:this.source.token
        }).then((res)=>{
            this.setState({
                data: res,
              });
        }).catch((err)=>{
            console.log(err);
        })
        myaxios.get('home/catitems',{
            cancelToken:this.source.token
        }).then((res)=>{
            this.setState({
                listCategory:res
            })
        })

        myaxios.get('home/floordata',{
            cancelToken:this.source.token
        }).then((res)=>{
            console.log(res);
            
            this.setState({
                img_list:res
            })
        })
       
    }
    componentWillUnmount(){
        this.source.cancel('Operation canceled by the user.');
    }
    clickBanner=(goods_id)=>{
        this.props.history.push('/details/'+goods_id)
    }
    flClick=()=>{
        this.props.history.push('/category')
    }
    goodsList=(url_text)=>{
        // console.log();
        let url = url_text.split('?')[1]
        this.props.history.push("/goodsLis?"+url)
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
                {/* 内容部分 */}
                <div className={stylels.contentCode}>
                    {/* 轮播图 */}
                    <div className={stylels.swipor}>
                        <Carousel
                            autoplay={false}
                            infinite
                            >
                            {this.state.data && this.state.data.map(val => (
                                <div
                                onClick={this.clickBanner.bind(this,val.goods_id)}
                                key={val}
                                href="http://www.alipay.com"
                                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                <img
                                    src={val.image_src}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    {/* 轮播图结束 */}
                    {/* 分类列表 */}
                    <div className={stylels.category}>
                        {
                            this.state.listCategory.map(val=>(
                                <div key={val.name}  onClick={this.flClick}><img src={val.image_src}></img></div>
                            ))
                        }
                    </div>
                    {/* 分类列表结束 */}
                    {/* 列表 */}
                    <div className={stylels.imgList}>
                        {this.state.img_list.map((val,i)=>(
                            <div className={stylels.titleImg}  key={i}>
                            <img src={val.floor_title.image_src}></img>
                            {
                                val.product_list.map(val=>(
                                    <div key={val.name} className={stylels.listImg} onClick={this.goodsList.bind(this,val.navigator_url)}>
                                        <img src={val.image_src}></img>
                                    </div>
                                ))
                            }
                            </div>
                        ))}
                    </div>
                    {/* 列表结束 */}
                </div>
                    {/* 内容部分结束 */}
                    
            </div>
        )
    }
}
