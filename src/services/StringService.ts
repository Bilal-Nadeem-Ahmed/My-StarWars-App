export class StringService {
  public GetIdFromUrl(url: string): string {
    const splitUrl = url.split('/').filter(Boolean)
    return splitUrl[splitUrl.length - 1]
  }
}
