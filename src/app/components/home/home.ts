import { Component } from '@angular/core';
import { Upload } from "../upload/upload";
import { GridList } from "../grid-list/grid-list";

@Component({
  selector: 'app-home',
  imports: [Upload, GridList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
