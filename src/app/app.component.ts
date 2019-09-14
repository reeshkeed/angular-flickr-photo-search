import { Component } from '@angular/core';
import { FlickrService } from './flickr.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-flickr-photo-search';

  public inputList : any = [];
  public pageNumber : number = 0;
  public inputQuery = new FormControl('');

  constructor(private _flickrService : FlickrService, private router : Router) { }

  pagination() {
    this._flickrService.getImages(this.pageNumber, this.inputQuery.value).subscribe(result => {
      this.inputList = result.photos.photo;
    })
  }

  searchQuery() {
    if (this.inputQuery.value == "") {
      console.log("Input needed");
    } else {
      this._flickrService.getImages(this.pageNumber, this.inputQuery.value).subscribe(result => {
        this.inputList = result.photos.photo;
        this.pageNumber = 1;
      })
    }
  }

  getImageUrl(input : any) : string {
    return this._flickrService.displayImage(input);
  }
}
