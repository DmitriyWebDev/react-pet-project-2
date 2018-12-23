import React from 'react'
import {connect} from 'react-redux'
import { increment } from "../../ducks/counter/index"

// counter component for test
class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.increment()
    }
    
    
    render() {
       return(
           <div onClick={this.handleClick}>
               Counter - {this.props.count}
           </div>
       )
    }
} 

const mapStateToProps = (state) => {
    const {count} = state.counter
    return {
        count
    }
}

export default connect(
    mapStateToProps,
    {increment}    
)(Counter)