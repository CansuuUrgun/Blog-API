import express from "express";
import { title } from "process";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors);
const port =  process.env.SERVERPORT || 3000;

var posts = [
    {
        id: 1,
        title: "AI-Powered Automation Reshaping Modern Workflows",
        content: "Artificial Intelligence continues to revolutionize how businesses operate by automating repetitive tasks and improving decision-making processes. From small startups to global enterprises, AI tools are being integrated into daily workflows to enhance productivity, reduce human error, and optimize resource allocation. As machine learning algorithms become more advanced, companies are adopting automated systems for customer support, data analysis, and operational forecasting at an unprecedented scale.",
        author: "Mia Williams",
        date: "9/24/2025, 5:59:04 PM"
    },
    {
        id: 2,
        title: "The Future of Cloud Computing: Edge and Hybrid Solutions",
        content: "Cloud computing is entering a new era with the rapid growth of edge and hybrid architectures. Instead of relying solely on centralized cloud servers, organizations are distributing computation closer to end users to reduce latency and increase security. Hybrid models offer the flexibility to combine on-premises infrastructure with public cloud resources, creating scalable and cost-effective environments. As demand for faster processing and real-time insights grows, edge computing is becoming essential for IoT, AI, and analytics-driven applications.",
        author: "Michael Reynolds",
        date: "10/14/2025, 2:30:58 PM"
    }
];

//GET All posts
app.get("/posts", (_, res) => res.json(posts));

//GET a specific post by id
app.get("/posts/:id", (req, res) => {
    var id = parseInt(req.params.id);
    var post = posts.find((post) => post.id === id);
    if(!post) return res.status(404).json({error: `The post with id: ${id} is not found.`});
    res.json(post);
});

//POST a new post
app.post("/posts", (req, res) => {
    const { title, content, author } = req.body;
    if (!title || !content || !author)
        return res.status(400).json({ error: "Missing fields" });
    
    const newPost = {
        id: posts.length + 1,
        title,
        content,
        author,
        date: new Date().toLocaleString()
    };   
    posts.push(newPost);

    res.status(201).json(newPost);
});

//PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) =>{
    var id = parseInt(req.params.id);
    var post = posts.find((post) => post.id === id);
    if(!post) return res.status(404).json({error: "Post not found"});
    
    const {title, content} = req.body;
    post.content = content || post.content;
    post.title   = title || post.title;
    post.date    = new Date().toLocaleString();
    
    res.status(200).json(post);
});

//DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
    var id = parseInt(req.params.id);
    var postIndex = posts.findIndex((post) => post.id === id);
    if(postIndex === -1) return res.status(404).json({error: "Post not found."});
    
    posts.splice(postIndex,1);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`API is running at ${port}`);
});