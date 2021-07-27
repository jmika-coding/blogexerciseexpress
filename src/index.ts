import express from "express"
import dotenv from "dotenv"

import {
  deleteBlogPost,
  findBlogPosts,
  postBlogPost,
  updateBlogPost,
} from "./find/blogPost/blogPostController"
import { router } from "typera-express"
import { runMigrations } from "./db/postgresClient"
import { getAppPort } from "./configuration/configurationService"
import { OpenAPIV3 } from "openapi-types"
import * as swaggerUi from "swagger-ui-express"
import { prefix } from "typera-openapi"
import myRouteDefs from "./index.openapi"

dotenv.config()

const openapiDoc: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "Blog Post Openapi",
    version: "0.1.0",
  },
  paths: {
    ...prefix("/api", myRouteDefs.paths),
  },
}

async function main() {
  const app = express()

  // Migrations
  runMigrations()

  app.get("/", (_, res) => res.end("Hello World!")) // Wrote in pure express

  app.use(express.json())
  app.use(
    router(
      findBlogPosts,
      postBlogPost,
      updateBlogPost,
      deleteBlogPost /*, otherRoute, stillAnother */
    ).handler()
  )
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiDoc))
  app.listen(getAppPort(), () => console.log("Application started"))
}

main().catch(console.error)

// Needed for generating openapi with typera-openapi
// Need to put all routes that are in app.use(router( of the main functions
export default router(findBlogPosts, postBlogPost, updateBlogPost, deleteBlogPost)
