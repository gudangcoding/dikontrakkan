import { Component } from '@angular/core';
import { restApi } from 'src/provider/restApi';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { defineCustomElements } from "@ionic/pwa-elements/loader";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  connection:any;
  gambar:any="";
  // images: LocalFile[] = [];
  images: any= [];
   hasPermission: any;
   token: any;
   pushPayload: any;

  constructor(private api:restApi) {
    
  }

  ionViewWillEnter(){
   
  }
 
 
  

 
  simpan(){
    let body={
      name : 'Ahmad Naufal Khalid',
      job:'Direktur'
    }
    this.api.post(body,'users').subscribe((res:any)=>{
      console.log(res);
      
    })
  }

 poto(){
  defineCustomElements(window);
 }

 

async selectImage() {
    let image =  Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos // Camera, Photos or Prompt!
    });
    
    if (image!=null) {
       this.gambar = this.images(image)
        console.log(this.gambar);
  
    }
}
 
}


