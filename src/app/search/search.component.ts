import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../flickr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

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
