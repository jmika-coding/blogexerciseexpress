import { dbClient } from "../../db/postgresClient"
import { Parser, Response, Route, route } from "typera-express"
import { deleteABlogPost, findAllBlogPost, postABlogPost, updateABlogPost } from "./blogPostService"
import { BlogPost, blogPostBody, blogPostBodyPatch } from "./blogPostDto"

export const findBlogPosts: Route<Response.Ok<BlogPost[]> | Response.NotFound<string, undefined>> =
  route
    .get("/blogpost")
    .use(dbClient)
    .handler(async (request) => {
      const allBlogPost = await findAllBlogPost(request.client)
      return allBlogPost === null
        ? Response.notFound("There are no post in the database")
        : Response.ok(allBlogPost)
    })

export const postBlogPost: Route<
  | Response.Ok<BlogPost>
  | Response.BadRequest<string>
  | Response.InternalServerError<string, undefined>
> = route
  .post("/blogpost")
  .use(dbClient, Parser.body(blogPostBody))
  .handler(async (request) => {
    const aBlogPost = await postABlogPost(request.client, request.body)
    return aBlogPost === null
      ? Response.internalServerError("Error while inserting a post in the database")
      : Response.ok(aBlogPost)
  })

export const updateBlogPost: Route<
  | Response.Ok<BlogPost>
  | Response.BadRequest<string>
  | Response.InternalServerError<string, undefined>
> = route
  .patch("/blogpost/:id(int)")
  .use(dbClient, Parser.body(blogPostBodyPatch))
  .handler(async (request) => {
    const aBlogPost = await updateABlogPost(request.client, request.routeParams.id, request.body)
    return aBlogPost === null
      ? Response.internalServerError("Error while updating a post in the database")
      : Response.ok(aBlogPost)
  })

export const deleteBlogPost: Route<
  Response.Ok<string> | Response.InternalServerError<string, undefined>
> = route
  .delete("/blogpost/:id(int)")
  .use(dbClient)
  .handler(async (request) => {
    const rowCount = await deleteABlogPost(request.client, request.routeParams.id)
    return rowCount === 1
      ? Response.ok(`Post ${request.routeParams.id} deleted`)
      : Response.internalServerError("Error while deleting a post in the database")
  })
