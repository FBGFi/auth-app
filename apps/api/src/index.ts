import Koa from "koa";

const app = new Koa();

app.use((ctx) => {
  ctx.status = 200;
});

app.listen(3000);
