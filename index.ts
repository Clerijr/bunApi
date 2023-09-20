import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

/* Config database */
const prisma = new PrismaClient();

/* Config server */
const app = express();
const port = 8080;
app.use(express.json());

app.post("/blog", async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    await prisma.post.create({
      data: {
        title: title,
        content: content,
      },
    });
    res.status(201).json({ message: `Post created!` });
  } catch (error) {
    console.error(`Something went wrong while create a new post: `, error);
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Api running");
});

app.get("/blog", async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    console.error(`Something went wrong while fetching all posts: `, error);
  }
});

app.get("/blog/:postId", async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId, 10);

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    console.error(`Something went wrong while fetching the post: `, error);
  }
});

app.delete("/blog/:postId", async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId, 10);

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    res.send(`Post deleted!`);
  } catch (error) {
    return res.status(404).json({ message: "Post not found" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
