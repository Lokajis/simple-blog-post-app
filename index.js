import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: true }));

let postSave = [];






app.get("/", (req, res) => {

    const newPost = {
        post: req.body.pOst,
    }
    res.render("index.ejs", { postingNow: newPost });
});

app.get("/secondPage.ejs", (req, res) => {
    console.log(postSave);

    res.render("secondPage.ejs", { postSave });
});


app.get("/delete", (req, res) => {

    const id = parseInt(req.body.id);
    const index = postSave.find((post) => post.id === id);

    console.log(index);
    postSave.splice(index, 1);
    res.redirect("/secondPage.ejs");
});

app.post("/submit", (req, res) => {
    let lastId = postSave.length;
    const newId = lastId + 1;

    const newPost = {
        post: req.body.pOst,
        id: newId
    }
    
    postSave.push(newPost);
    res.render("index.ejs", { postNow: newPost });
});




app.listen(port, () => {
    console.log(`server running on port ${port}.`);
})
