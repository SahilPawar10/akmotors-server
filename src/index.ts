import app from "./app.js";

const port: number | string = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
  console.log(`🚀 Running Node version: ${process.version}`);
});
