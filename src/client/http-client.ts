let count = 0
export class HttpClient {
  constructor() {
    count++
    if (count > 1) {
      throw new Error("httpService has been already instantiated")
    }
  }
}
