import { Client } from "pg"
import { BlogPost, BlogPostBody, BlogPostBodyPatch } from "./blogPostDto"

export async function findAllBlogPost(client: Client): Promise<BlogPost[] | null> {
  const { rows } = await client.query("SELECT * FROM post;")

  return rows.length >= 0
    ? rows.map((row) => {
        return { id: row.id, post: row.post, title: row.title, likes: row.likes }
      })
    : null
}

export async function postABlogPost(client: Client, body: BlogPostBody): Promise<BlogPost | null> {
  const { rows } = await client.query(
    `INSERT INTO post(post, title, likes) VALUES ('${body.post}', '${body.title}', ${body.likes}) RETURNING *;`
  )

  return rows.length >= 0
    ? { id: rows[0].id, post: rows[0].post, title: rows[0].title, likes: rows[0].likes }
    : null
}

export async function updateABlogPost(
  client: Client,
  id: number,
  body: BlogPostBodyPatch
): Promise<BlogPost | null> {
  const { rows } = await client.query(
    `UPDATE post SET ${formatUpdateSetPatchBlogPost(body)} WHERE id = ${id} RETURNING *;`
  )

  return rows.length >= 0
    ? { id: rows[0].id, post: rows[0].post, title: rows[0].title, likes: rows[0].likes }
    : null
}

const formatUpdateSetPatchBlogPost = (body: BlogPostBodyPatch) => {
  let columnsNameValue: string = ""
  if (body.post !== undefined) columnsNameValue = columnsNameValue.concat(`post = '${body.post}',`)
  if (body.title !== undefined)
    columnsNameValue = columnsNameValue.concat(`title = '${body.title}',`)
  if (body.likes !== undefined) columnsNameValue = columnsNameValue.concat(`likes = ${body.likes}`)
  if (columnsNameValue.endsWith(","))
    return columnsNameValue.substring(0, columnsNameValue.length - 1)

  return columnsNameValue
}

export async function deleteABlogPost(client: Client, id: number): Promise<number> {
  const { rowCount } = await client.query(`DELETE FROM post WHERE id = ${id} RETURNING *;`)
  return rowCount
}
