import { Component } from '@angular/core';
import { FlickrService } from './flickr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-flickr-photo-search';

  public inputList : any = [];
  public pageNumber : number = 1;

  constructor(private _flickrService : FlickrService, private router : Router) { }

  ngOnInit() {
    this.getImageList();
  }

  getImageList() {
    this._flickrService.getImages(this.pageNumber).subscribe(result => {
      this.inputList = result.photos.photo;
    })
  }

  getImageUrl(input : any) : string {
    return this._flickrService.displayImage(input);
  }
}
