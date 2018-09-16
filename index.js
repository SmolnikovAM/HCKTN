const Koa = require("koa");
const Router = require("koa-router");

const db = require("./init");

const app = new Koa();
const router = new Router();

let i = 0;

async function startApp() {
  await db.schema.dropTableIfExists("test");
  await db.schema.createTable("test", t => {
    t.increments().primary();
    t.string("text");
  });

  // await db("test").insert({ text: "test data" });

  router.get("/test", async ctx => {
    await db("test").insert({ text: `test data ${++i}` });

    ctx.body = await db("test")
      .select()
      .where({ id: i })
      .first();
  });

  app.use(router.allowedMethods());
  app.use(router.routes());
  app.listen(80);
}

startApp();
