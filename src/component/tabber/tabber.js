import React, { Component } from 'react'
import { TabBar } from 'antd-mobile';
import {withRouter} from "react-router-dom"

class tabber extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedTab: 'redTab',
          hidden: false,
          fullScreen: true,
        }
    }
    render() {
        return (
            <div style={this.state.fullScreen 
            ? { position: 'fixed', height: '100%', width: '100%', top: 0 } 
            : { height: 400 }}>
            <TabBar
              unselectedTintColor="#949494"
              tintColor="#ff2d4a"
              barTintColor="white"
              hidden={this.state.hidden}
            >
              <TabBar.Item
                title="首页"
                key="index"
                icon={<i className='iconfont icon-shouye'></i>
                }
                selectedIcon={<i className='iconfont icon-shouye'
                style={{color:'red'}}
                ></i>
                }
                selected={this.props.location.pathname === '/'}
                onPress={() => {
                   this.props.history.push('/')
                }}
              >
                {this.props.location.pathname === '/' && this.props.children}
              </TabBar.Item>
              <TabBar.Item
                icon={
                  <i className='iconfont icon-leimupinleifenleileibie'></i>
                }
                selectedIcon={
                  <i className='iconfont icon-leimupinleifenleileibie'
                  style={{color:'#ff5b05'}}
                  ></i>
                }
                title="分类"
                key="Koubei"
                selected={this.props.location.pathname === '/category'}
                onPress={() => {
                   this.props.history.push('/category')
                }}
             
              >
                {this.props.location.pathname === '/category' &&this.props.children}
              </TabBar.Item>
              <TabBar.Item
                icon={
                  <i className='icon-gouwuche iconfont'></i>
                }
                selectedIcon={
                  <i className='iconfont icon-gouwuche'
                  style={{color:'#ff5b05'}}
                  ></i>
                }
                title="购物车"
                key="Friend"
                selected={this.props.location.pathname === '/cart'}
                onPress={() => {
                  this.props.history.push('/cart')
                }}
              >
                {this.props.location.pathname === '/cart' && this.props.children}
              </TabBar.Item>
              <TabBar.Item
                icon={
                  <i className='iconfont icon-wode'></i>
                }
                selectedIcon={
                  <i className='iconfont icon-wode'
                  style={{color:'#ff5b05'}}
                  ></i>
                }
                title="我"
                key="my"
                selected={this.props.location.pathname === '/my'}
                onPress={() => {
                  this.props.history.push('/my')
                }}
              >
                {this.props.location.pathname === '/my' && this.props.children}
              </TabBar.Item>
            </TabBar>
          </div>
        )
    }
}

export default withRouter(tabber)