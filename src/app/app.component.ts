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
  public selectedImg = null;

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

  imageInfo(id : number) {
    this._flickrService.getImageInfo(id).subscribe(result => {
      this.selectedImg = result.photo;
      $('#selectedModal').modal('show');
      console.log(this.selectedImg);
    })
  }

  showImage() {
    return this._flickrService.displayImage(this.selectedImg);
  }

  getImageUrl(input : any) : string {
    return this._flickrService.displayImage(input);
  }
}
