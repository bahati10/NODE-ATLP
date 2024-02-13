import express from "express";
import Post from "../models/post.js";

    const router = express.Router()
    router.get("/posts", async (req, res) => {
        const posts = await Post.find()
        res.send(posts)
    })

    router.post("/posts", async (req, res) => {
        try {
            const post = new Post({
                title: req.body.title,
                content: req.body.content,
            })
            await post.save()
            res.send(post)
        } catch (error) {
            console.error("Error saving post:", error);
            res.status(500).send("Error saving post");
        }
    })

    router.get("/posts/:id", async (req, res) => {
        try {
            const post = await Post.findOne({ _id: req.params.id })

            if(!post){
                return res.status(404).json({ msg: "Blog not found", error: "" })
            }else{
                res.send(post)
            }


        } catch (error) {
            return res.status(400).json({ msg: "Something went wrong", error })
        }
    })

    router.patch("/posts/:id", async (req, res) => {
        try {
            const post = await Post.findOne({ _id: req.params.id })
    
            if (req.body.title) {
                post.title = req.body.title
            }
    
            if (req.body.content) {
                post.content = req.body.content
            }
    
            await post.save()
            res.send(post)
        } catch {
            res.status(404)
            res.send({ error: "Post doesn't exist!" })
        }
    })

    router.delete("/posts/:id", async (req, res) => {
        try {
            await Post.deleteOne({ _id: req.params.id })
            res.status(204).send()
        } catch {
            res.status(404)
            res.send({ error: "Post doesn't exist!" })
        }
    })
    

    export default router;