const Koa = require("koa");
const cors = require("@koa/cors");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const serve = require('koa-static');
// const { getWorkspacePath } = require("./helper");
// const { getWorkspacePath } = require("../utils");
const workCommand = require('./work-command');
const app = new Koa();

app.use(serve('./public'));
app.use(bodyParser());
app.use(cors());

const router = new Router();

router.get('/ping', async ctx => {
  ctx.body = {
    msg: 'ok'
  };
});

router.post("/work/:workname/:command", async (ctx, next) => {
  const workName = ctx.params.workname;
  const command = ctx.params.command;
  const reqBody = ctx.request.body;
  // const workspacePath = getWorkspacePath(workName);
  const resp = {
    msg: 'ok',
  };
  let commandExecResult = null;
  if (workCommand[command]) {
    commandExecResult = workCommand[command](workName, reqBody);
  } else {
    resp.msg = '指令不存在'
  }
  // console.log(workCommand);
  // console.log(reqBody, workspacePath, command);
  ctx.body = resp;
});

app.use(router.routes()).use(router.allowedMethods());

// app.listen(PORT);
module.exports = {
  app,
}