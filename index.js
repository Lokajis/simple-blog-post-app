import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));


app.use(bodyParser.urlencoded({ extended: true }));

let postSave = [];

/*function deleteElements () {
    for (let no=0 ; no < postSave.length; no++ ){

const buttonId = document.getElementById("button"+no);

 }

buttonId.addEventListener('click', () => {
console.log(this.id);
});
*/

function createBlog(postNow) {
    postSave.push(postNow);
}

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/submit", (req, res) => {
    const postNow = req.body["pOst"];
    createBlog(postNow);
    res.render("index.ejs", { postingNow: postNow });
});




app.get("/secondPage.ejs", (req, res) => {
    console.log(postSave);

    res.render("secondPage.ejs", { postSave });
});

app.post("/delete", (req, res) => {
    const indexToDelete = req.body.index;
    if (indexToDelete >= 0 && indexToDelete < postSave.length) {
        postSave.splice(indexToDelete, 1);
    }
    res.redirect("/secondPage.ejs");
});


app.get("/index.ejs", (req, res) => {

    res.render("index.ejs");
});


app.listen(port, () => {
    console.log(`server running on port ${port}.`);
})