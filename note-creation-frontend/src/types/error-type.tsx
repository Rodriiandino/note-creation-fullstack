export type error = {
  message: string
  status: number
  fieldErrors: {
    field: string
    message: string
  }[]
}
