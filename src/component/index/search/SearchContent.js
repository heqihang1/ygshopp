import React, { Component } from 'react'
import Search from './SearchContent.module.scss'
import {withRouter} from "react-router-dom"
 class SearchContent extends Component {
    render() {
        return (
            <div className={Search.SearchBox} onClick={this.handleClick}>
                <div className={Search.SearchText}>
                    搜索
                </div>
            </div>
        )
    }
    handleClick=()=>{
        this.props.history.push('/seach')
        // console.log(this.props.history);
        
    }
}
export default withRouter(SearchContent)