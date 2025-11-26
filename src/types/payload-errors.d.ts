// src/types/payload-errors.d.ts

declare module 'payload/errors' {
  export class ValidationError extends Error {
    constructor(
      errors: {
        message: string
        field?: string
      }[],
    )
  }

  export class APIError extends Error {
    status: number
    constructor(message: string, status?: number)
  }
}
