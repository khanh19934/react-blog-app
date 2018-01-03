const User = require('../model/User');
const Blog = require('../model/Blog');
const Image = require('../model/Images');
const multer = require('multer');
const upload = multer({ dest:"../uploads" });
const bcrypt = require('bcryptjs');
const fs = require('fs');
const generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
module.exports = (app) => {
    app.post('/api/createblog',async (req,res)=>{
        const newBlog = new Blog({
            title:req.body.title,
            content:req.body.content,
            author:req.user._id
        });
        const saveBlog = await newBlog.save();
        res.send(saveBlog);
    });

    app.get('/api/bloglist',async (req,res)=>{
       
        let page =  req.query.offset > 0 ? req.query.offset : 0;
        let count = await Blog.find({}).count('title');
        
        const blogPost = await Blog.find({}).populate('author').limit(10).skip((parseInt(req.query.offset)) * 10);
        if(blogPost){
            res.status(200).json({result:blogPost,count});
        }else{
            res.send({error:"Cant not get blog!"});
        }
    });

    app.get('/api/blog/:id',async (req,res) => {
        const blogDetail = await Blog.findById(req.params.id).populate('author').exec();
        if(blogDetail){
            res.send(blogDetail);
        }else{
            res.send({error:"Blog not found or deleted"});
        }
    });
    //myImg la name of input form
    app.post('/api/updateInfo',upload.single('myImg'),async (req,res)=>{
      
        const update = await User.findByIdAndUpdate(req.user._id,{
            userName:req.body.name,
            phoneNumber:req.body.phoneNumber,
            address:req.body.address,
            avatar:{
                data:fs.readFileSync(req.file.path),
                contentType:req.file.mimetype
            }
        });
        if(update){
            res.send({message:"Upload successed"});
        }
        
    });

    app.get('/api/userInfo',async (req,res)=>{
        const userInfo = await User.findById(req.user._id);
        if(userInfo){
            res.send(userInfo.toJSON());
        } 
    });

    app.get('/api/image/:idImage',async (req,res) => {
        const getImg = await Image.findById(req.params.idImage);
        res.contentType(getImg.img.contentType);
        const img = getImg.img.data.toString('base64');
        res.send({type:getImg.img.contentType,
        data:img});
    });

    app.post('/api/editblog/:idBlog',async (req,res) => {
        const updateBlog = await Blog.findByIdAndUpdate(req.params.idBlog,{
            $set:{
                title:req.body.title,
                content:req.body.content
            }
        });
        if(updateBlog){
            res.send({message:"Update Blog Succesful! "});
        }
    });
    app.delete('/api/deleteblog/:idBlog',async(req,res) => {
        const deletedBlog = await Blog.findByIdAndRemove(req.params.idBlog);
        if(deletedBlog){
            res.send({messenger: "Success Deleted"});
        }
    });

    app.post('/api/addComment/:idBlog', async (req,res) => {
        const message = {
            content:req.body.content,
            user:req.user._id
        };
        const addComment = await Blog.findByIdAndUpdate(req.params.idBlog,{
            $push:{
                comment:message
            }
        }).populate("comment.user");
        if(addComment){
            res.send(addComment);
        }
    });

    app.get('/api/listComment/:idBlog', async (req,res) => {
        const listComment = await Blog.findById(req.params.idBlog).populate("comment.user");
        if(listComment){
            res.send(listComment);
        }
    });
    // app.post('/api/searchblog',async (req,res) => {
    //     const result = await Blog.find({$text:{$search:req.body.searchInput,$caseSensitive: true}});
    //     if(result){
    //         res.send(result);
    //     }
    // });
    app.patch('/api/likesBlog/:idBlog', async (req,res) => {
        const liked = await Blog.findByIdAndUpdate(req.params.idBlog,{
            $inc:{
                likes:1
            }
        });
        if(liked){
            res.send(liked);
        }
    });
    app.patch('/api/unlikesBlog/:idBlog',async (req,res) => {
        const unliked = await Blog.findByIdAndUpdate(req.params.idBlog,{
            $inc:{
                likes:-1
            }
        });
    });
}