export class StringService {
  public GetIdFromUrl(url: string): string {
    const splitUrl = url.split('/')
    return splitUrl[splitUrl.length - 1]
  }
}
