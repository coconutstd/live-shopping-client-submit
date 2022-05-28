export class HttpClient {
  private static instance: HttpClient
  private baseUrl: string

  private constructor() {
    this.baseUrl = "http://localhost:5000"
  }

  public static getClient(): HttpClient {
    return this.instance || (this.instance = new this())
  }

  public async request(path: string, options?: RequestInit): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, options)
      return await response.json()
    } catch (e) {
      console.log(e)
    }
  }
}
