import { OpenAPIV3 } from "openapi-types"

const spec: { paths: OpenAPIV3.PathsObject } = {
  paths: {
    "/blogpost": {
      get: {
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    required: ["id", "title", "post", "likes"],
                    properties: {
                      id: { type: "number" },
                      title: { type: "string" },
                      post: { type: "string" },
                      likes: { type: "number" },
                    },
                  },
                },
              },
            },
          },
          "404": {
            description: "Not Found",
            content: { "text/plain": { schema: { type: "string" } } },
          },
        },
      },
      post: {
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "post", "likes"],
                properties: {
                  title: { type: "string" },
                  post: { type: "string" },
                  likes: { type: "number" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["id", "title", "post", "likes"],
                  properties: {
                    id: { type: "number" },
                    title: { type: "string" },
                    post: { type: "string" },
                    likes: { type: "number" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: { "text/plain": { schema: { type: "string" } } },
          },
          "500": {
            description: "Internal Server Error",
            content: { "text/plain": { schema: { type: "string" } } },
          },
        },
      },
    },
    "/blogpost/{id}": {
      patch: {
        parameters: [{ name: "id", in: "path", required: true }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: [],
                properties: {
                  title: { type: "string" },
                  post: { type: "string" },
                  likes: { type: "number" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["id", "title", "post", "likes"],
                  properties: {
                    id: { type: "number" },
                    title: { type: "string" },
                    post: { type: "string" },
                    likes: { type: "number" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Bad Request",
            content: { "text/plain": { schema: { type: "string" } } },
          },
          "500": {
            description: "Internal Server Error",
            content: { "text/plain": { schema: { type: "string" } } },
          },
        },
      },
      delete: {
        parameters: [{ name: "id", in: "path", required: true }],
        responses: {
          "200": { description: "OK", content: { "text/plain": { schema: { type: "string" } } } },
          "500": {
            description: "Internal Server Error",
            content: { "text/plain": { schema: { type: "string" } } },
          },
        },
      },
    },
  },
}

export default spec
