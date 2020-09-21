import React, { Component } from 'react'
import { NavBar, Icon, SearchBar, Tabs, WhiteSpace, Badge , Toast} from 'antd-mobile';
import styles from './goodslist.module.scss'
import myAxiox from '../../utils/myaxios'
import imgbox from './noImg.jpg'
export default class goodsList extends Component {
    constructor(props){
        super(props)
        this.pagenum=1
        this.total= null
        this.singlePage = 20
        this.Scoll = React.createRef()
    }
    state = {
        value: '',
        tabs: [
            { title: <Badge >综合</Badge> },
            { title: <Badge >价格</Badge> },
            { title: <Badge >销量</Badge> },
        ],
        data: []
    }
    componentDidMount() {
        //获取数据
        this.automaticData()
        // 获取当前元素
        this.Scoll.current.addEventListener('scroll',this.handleScoll)
    }
    handleScoll = () =>{
        // 滚动条总距离
        let parentElement = this.Scoll.current.scrollHeight
        // 窗口高度
        let heightscreen = this.Scoll.current.clientHeight
        // 滚动的距离
        let parentScrollTop = this.Scoll.current.scrollTop 
 
        //触底的时候获取数据
        // console.log(parentElement-heightscreen-parentScrollTop);
        if(parentElement-heightscreen-parentScrollTop<=1){
            // console.log(2);
            this.automaticData()
        }
        // console.log(parentElement,heightscreen);
    }
    //获取数据的函数
    automaticData(){
        let params = {}
        let url = this.props.location.search.split('?')[1].split('=')
        if (url[0] == 'cid') {
            params.cid = url[1]
        }
        if (url[0] == 'query') {
            params.query = decodeURIComponent(url[1])
        }
        // 判断数据是否是第一页
        if(!!this.total){
            console.log(!!this.total);
            this.pagenum++
            params.pagenum = this.pagenum
            //判断页数是否超出
            console.log(Math.ceil(this.total/this.singlePage),this.pagenum);
            if(this.pagenum >Math.ceil(this.total/this.singlePage)){
                Toast.info('o(╥﹏╥)o到底了', 1)
            }else{
                myAxiox.get('/goods/search', {
                    params: params
                }).then(res => {
                    this.setState({
                        data: [...this.state.data,...res.goods]
                    },)
                }).catch(err => {
                    console.log(err);
                })
            }
            
        }else{
            params.pagenum = this.pagenum

            myAxiox.get('/goods/search', {
                params: params
            }).then(res => {
                console.log(res);
                this.total = res.total
                
                this.setState({
                    data: res.goods
                },)
            }).catch(err => {
                console.log(err);
            })
        }
        
    }
    handleCart = (params) => {
        console.log(params)
        this.props.history.push('/details/'+params)
    }
    
    render() {
        return (
            <div style={{ height: '100vh', background: '#fff' }}>
                {/* 顶部 */}
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => window.history.go(-1)}
                    style={{ background: 'red', color: '#fff ' }}
                >商品列表</NavBar>
                {/* 搜索 */}
                <SearchBar
                    value={this.state.value}
                    showCancelButton
                    placeholder='search'
                    onChange={this.onChange}
                />
                {/* tab切换 */}
                <div>

                    <Tabs tabs={this.state.tabs}
                        initialPage={0}
                        tabBarActiveTextColor={'#000'}
                        tabBarUnderlineStyle={{ borderColor: "red" }}
                    >
                        <div className={styles.goodsBox}>
                            <ul ref={this.Scoll} className={styles.goodsList}>
                                {this.state.data.map(v => {
                                    return <li className={styles.goodsTtme} key={v.goods_id} onClick={this.handleCart.bind(this,v.goods_id)}>
                                        <div className={styles.goodsImg}>
                                            <img src={v.goods_big_logo?v.goods_big_logo:imgbox} alt="" />
                                        </div>
                                        <div className={styles.goodsText}>
                                            <span className={styles.name}>{
                                                v.goods_name
                                            }</span>
                                            <span className={styles.price}>
                                                ￥{v.goods_price}
                                            </span>
                                        </div>
                                    </li>
                                })}
                            </ul>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                            Content of second tab
                    </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                            Content of third tab
                    </div>
                    </Tabs>
                    <WhiteSpace />
                </div>
            </div>
        )
    }
}
