import React from 'react';
import {connect} from 'react-redux';
import ReactPaginate from 'react-paginate';
import * as actions from '../actions';
import BlogItem from './BlogPost';

class BlogPageContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            blogPost : {result:null},
            offset:0,
            perPage:10
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    async componentDidMount(){
        
       const res =  await this.props.getBlog(this.state.offset);
        if(res){this.setState((state)=>{
            return {
                blogPost:{...state.blogPost,result:this.props.blogPost.result,...this.props.blogPost}
            }
        });
    }
    }

   async handlePageClick(data){

        let selected = data.selected;
        const res = await this.props.getBlog(selected);
        if(res){
            this.setState((state)=>(
                {offset:state.offset+1,
                    blogPost:{...state.blogPost,result:this.props.blogPost.result,...this.props.blogPost}})
            );
        }
    }

    render(){

        if(this.state.blogPost.result === null ){return <h1>Loading....</h1>}

        return (
            <div className="container">
                <h1 className="text-center">Blog</h1>
                <ul className="list-group">
                    {   this.state.blogPost.result.map((blogItem)=>{
                            return (
                                <BlogItem key={blogItem._id} details={blogItem}/>
                            );
                    })}
                </ul>
                <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={Math.ceil(this.state.blogPost.count / this.state.perPage)}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
            </div>
        );
    }
}
const mapStateToProps = (state)=>({
    blogPost:state.blog
});
export default connect(mapStateToProps,actions)(BlogPageContent);