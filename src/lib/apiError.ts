export class APIError extends Error {
  status: number

  constructor(message: string, status = 400) {
    super(message)
    this.name = 'APIError'
    this.status = status
  }
}
