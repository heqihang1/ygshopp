import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom'
import Tabber from './component/tabber/tabber'
import Index from './component/index/index'
import Cart from './component/cart/cart'
import Category from './component/category/category'
import My from './component/my/my'
import GoodsDetails from './component/goodsDetails/goodsDetails'
import GoodsList from './component/goodsList/goodsList'
import Seach from './component/SecarchPage/seachPage'
import Login from './component/login/login'
import Register from './component/reg/reg'

import Cs from './component/cs/cs'
export default class RouterConfig extends Component {
    render() {
        return (
            <Router>
                <Route exact path='/' render={(props)=><Tabber><Index {...props}></Index></Tabber>}></Route>
                <Route exact path='/category' render={(props)=><Tabber><Category {...props}></Category></Tabber>}></Route>
                <Route exact path='/cart' render={(props)=><Tabber><Cart {...props}></Cart></Tabber>}></Route>
                <Route exact path='/my' render={(props)=><Tabber><My {...props}></My></Tabber>}></Route>
                <Route exact path='/seach' render={(props)=><Seach {...props}></Seach>}></Route>
                <Route exact path="/details/:goods_id" render={(props)=><GoodsDetails {...props}></GoodsDetails>}></Route>
                <Route exact path="/goodsLis" render={(props)=><GoodsList {...props}></GoodsList>}></Route>
                <Route exact path='/login' render={(props)=><Login {...props}></Login>}></Route>
                <Route exact path='/cs' render={(props)=><Cs></Cs>}></Route>
                <Route exact path='/register' render={(props)=><Register {...props}></Register>}></Route>
            </Router>
        )
    }
}
