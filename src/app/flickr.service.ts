import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable({
  providedIn: 'root'
})
export class FlickrService {

  private flickrArgs = {
    params: {
      api_key : 'cc9cb4d48909c3366187f8fcd31a6a9c',
      privacy_filter : '5',
      sort : 'relevance',
      safe_search : '1',
      content_type : '1',
      media: 'photos',
      format : 'json',
      nojsoncallback: '1',
      per_page : '19'
    }
  }

  private flickrUrl = "https://www.flickr.com/services/rest/";

  constructor(private http : HttpClient) { }

  getImages(pageNumber : number, query : string) : Observable<any> {
    const API_URL = this.flickrUrl;
    this.flickrArgs.params['method'] = 'flickr.photos.search';
    this.flickrArgs.params['tags'] = query;
    this.flickrArgs.params['text'] = query;
    this.flickrArgs.params['page'] = pageNumber;
    return this.http.get<any>(API_URL,this.flickrArgs);
  }

  displayImage(input:any): string {
    return 'http://farm'+input.farm+'.static.flickr.com/'+input.server+'/'+input.id+'_'+input.secret+'.jpg';
  }
}
