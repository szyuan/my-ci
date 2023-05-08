const Koa = require("koa");
const cors = require("@koa/cors");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");

const PORT = 3000;

const app = new Koa();

app.use(bodyParser());
app.use(cors());

const router = new Router();

router.post("/job/", async (ctx, next) => {
  const contacts = {
    msg: 'ok',
  };
  ctx.body = contacts;
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(PORT);