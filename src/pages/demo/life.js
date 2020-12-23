import React, { Component }from 'react';
import Child from './Child';
export default class Life extends Component {
    constructor(props) { 
        super(props)
        this.state = {
            count:0
        }
    }
    add = () => {
        this.setState({
            count: this.state.count + 1,
        })
    }
    render() { 
        return (
            <div>
                <div>react生命周期</div>
                <button onClick={this.add}>点击一下</button>
                <p>{this.state.count}</p>
                <Child name="hello react"/> 
            </div>
        )
    }
}