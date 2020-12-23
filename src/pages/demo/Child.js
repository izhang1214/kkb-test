import React, { Component } from 'react';

export default class Child extends Component { 
    constructor(props) { 
        console.log('constructor');
        super(props)
    }
    componentWillMount() {
        console.log('componentWillMount');
    }
    componentDidMount() { 
        console.log('did mount');
    }
    componentWillReceiveProps(newpropws) { 
        console.log('will props' + newpropws.name);
    }
    shouldComponentUpdate() { 
        // 调用了  setState 方法，就会触发该生命早期
        console.log('should component update');
        return true; //return false 后面的生命周期会被阻止
    }
    componentWillUpdate() {
        console.log('Will Update');
    }
    componentDidUpdate() {
        console.log('did update');
    }
    render() {
        console.log('render',this.props);
        return (
            <div>
                <p>{ this.props.name}</p>
            </div>
        )
    }
}