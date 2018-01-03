import React from 'react';
import Moment from 'react-moment';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {withRouter} from 'react-router-dom';
class Comment extends React.Component {
    constructor(){
        super();
        this.state = {
            comment:[]
        }
    }
    async componentWillMount(){
        const comment = await this.props.getComment(this.props.idBlog);
       if(comment){
        this.setState(state => ({
            comment:this.state.comment.concat(this.props.blog.comment)
        }));
       }
    }
    render(){
        if(this.props.blog === null || this.props.blog.comment === null) return null;
        return (
            <div>
                {this.state.comment.map(comment => {
                    return (
                        <div className="well" key={comment._id}>
                            <h4>{comment.user.userName && comment.user.userName}</h4>
                            <p>{comment.content}</p>
                            <Moment fromNow>{comment.commentAt}</Moment>
                        </div>
                    );
                })}

                
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        blog:state.blog
    }
}
export default withRouter(connect(mapStateToProps,actions)(Comment)) ;
