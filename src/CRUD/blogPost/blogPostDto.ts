import * as t from "io-ts"

export interface BlogPost {
  id: number
  title: string
  post: string
  likes: number
}

export interface BlogPostBody {
  title: string
  post: string
  likes: number
}

export const blogPostBody = t.type({
  title: t.string,
  post: t.string,
  likes: t.number,
})

export interface BlogPostBodyPatch {
  title?: string
  post?: string
  likes?: number
}

export const blogPostBodyPatch = t.partial({
  title: t.string,
  post: t.string,
  likes: t.number,
})
