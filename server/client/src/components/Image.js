import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
class Image extends React.Component{
    constructor(){
        super();
        this.state={
            img:'',
            type:''
        }
    }
   async componentWillMount(){
      const test = await this.props.getImage('5a40f0294a8893c8d0298c63');
      if(test){
        this.setState({img:test.payload.data,type:test.payload.type});
      }
    }
    render(){
        return (
            <div>
                <img src={`data:${this.state.type};` +"base64," + this.state.img} alt=""/>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    image:state.image
});
export default connect(mapStateToProps,actions)(Image);