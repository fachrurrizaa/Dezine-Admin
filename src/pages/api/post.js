import mongooseConnect from "../../../lib/mongoose";
import { Post } from "../../../models/Post";

export default async function handler(req, res) {
    const {method} = req;
    await mongooseConnect();
    
    if (method === 'GET'){
        if (req.query?.id){
            res.json(await Post.findOne({_id:req.query.id}))
        }else {
            res.json(await Post.find());
        }
    }

    if (method === 'POST'){
        const {title, description, link, images, category} = req.body;
        const postDoc = await Post.create({
            title, description, link, images, category
        })
        res.json(postDoc)
    }
    
    if (method === 'PUT'){
        const {title, description, link, images, category, _id} = req.body;
        await Post.updateOne({_id}, {title, description, link, images, category})
        res.json(true)
    }

    if (method === "DELETE"){
        if (req.query?.id) {
            await Post.deleteOne({_id:req.query?.id})
            res.json(true)
        }
    }
}
