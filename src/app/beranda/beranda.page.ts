import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beranda',
  templateUrl: './beranda.page.html',
  styleUrls: ['./beranda.page.scss'],
})
export class BerandaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  slidesOptions = {
    slidesPerView:1.5
  }

}
