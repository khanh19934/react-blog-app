import React from 'react';
import {connect} from 'react-redux';
import ReactPaginate from 'react-paginate';
import * as actions from '../actions';
import BlogItem from './BlogPost';
import BlogPageContent from './BlogPageContent';
// class Blog extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             blogPost : {result:null},
//             offset:0,
//             perPage:10
//         }

//     }
//     async componentWillMount(){
//        const res =  await this.props.getBlog();
//         if(res){this.setState((state)=>{
//             return {
//                 blogPost:{...state.blogPost,result:this.props.blogPost.result,...this.props.blogPost}
//             }
//         });
//     }
//     }

//     handlePageClick(data){
//         console.log(this.props.route.perPage);
//         let selected = data.selected;
//         let offset = Math.ceil(selected );
//         this.setState({offset})
//         console.log(this.state.offset);
//     }

//     render(){

//         if(this.state.blogPost.result === null ){return null}

//         return (
//             <div className="container">
//                 <h1 className="text-center">Blog</h1>
//                 <ul className="list-group">
//                     {   this.state.blogPost.result.map((blogItem)=>{
//                             return (
//                                 <BlogItem key={blogItem._id} details={blogItem}/>
//                             );
//                     })}
//                 </ul>
//                 <ReactPaginate previousLabel={"previous"}
//                        nextLabel={"next"}
//                        breakLabel={<a href="">...</a>}
//                        breakClassName={"break-me"}
//                        pageCount={this.state.blogPost.count / this.state.perPage}
//                        marginPagesDisplayed={2}
//                        pageRangeDisplayed={5}
//                        onPageChange={this.handlePageClick}
//                        containerClassName={"pagination"}
//                        subContainerClassName={"pages pagination"}
//                        activeClassName={"active"} />
//             </div>
//         );
//     }
// }
// const mapStateToProps = (state)=>({
//     blogPost:state.blog
// });
// export default connect(mapStateToProps,actions)(Blog);

const Blog = (props)=>(<BlogPageContent perPage={10}/>);
export default Blog;