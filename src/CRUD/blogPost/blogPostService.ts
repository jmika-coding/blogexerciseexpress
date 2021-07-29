import { Pool } from "pg"
import { BlogPost, BlogPostBody, BlogPostBodyPatch } from "./blogPostDto"

export async function findAllBlogPost(pool: Pool): Promise<BlogPost[]> {
  const { rows } = await pool.query("SELECT * FROM post;")

  return rows.length >= 0
    ? rows.map((row) => {
        return { id: row.id, post: row.post, title: row.title, likes: row.likes }
      })
    : []
}

export async function postABlogPost(pool: Pool, body: BlogPostBody): Promise<BlogPost> {
  const { rows } = await pool.query(
    `INSERT INTO post(post, title, likes) VALUES ('${body.post}', '${body.title}', ${body.likes}) RETURNING *;`
  )

  if (rows.length === 0) throw new Error()

  return {
    id: rows[0].id,
    post: rows[0].post,
    title: rows[0].title,
    likes: rows[0].likes,
  }
}

export async function updateABlogPost(
  pool: Pool,
  id: number,
  body: BlogPostBodyPatch
): Promise<BlogPost> {
  const { rows } = await pool.query(
    `UPDATE post SET ${formatUpdateSetPatchBlogPost(body)} WHERE id = ${id} RETURNING *;`
  )

  if (rows.length === 0) throw new Error()

  return { id: rows[0].id, post: rows[0].post, title: rows[0].title, likes: rows[0].likes }
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

export async function deleteABlogPost(pool: Pool, id: number): Promise<number> {
  const { rowCount } = await pool.query(`DELETE FROM post WHERE id = ${id} RETURNING *;`)
  return rowCount
}
