import { Component, OnInit,ViewChild,ElementRef  } from "@angular/core";
import { Camera, CameraResultType } from '@capacitor/camera';
// import { Filesystem, Directory } from '@capacitor/filesystem';
// import { Preferences } from '@capacitor/preferences';
import { restApi } from "src/provider/restApi";
// import { Storage } from '@ionic/storage';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  
  gambar: any = "";
  hasil : any;
  blob  : any = "";
  constructor(
    private api:restApi, 
    // private storage: Storage
    ) { 
    
  }
  @ViewChild('gambarnya') gambarnya!: ElementRef;
  
  ngOnInit(): void {
    
  }

  
  sendDataUri(){
     let body = {
      poto:this.blob.__zone_symbol__value
     } 
     this.api.post(body,'cek.php').subscribe((res:any)=>{
      //console.log(res);
     })
  }

  sendDataUrl(){
    let body = {
     poto:this.gambar
    } 
    this.api.post(body,'cek.php').subscribe((res:any)=>{
     //console.log(res);
    })
 }




  ambilpoto(){
    const image =  Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    image.then((res:any)=>{
      this.gambar = res.dataUrl;
      this.gambarnya.nativeElement.src = this.gambar;
      console.log(this.gambar); 
    })
    
  }

  ambilpoto2(){
    const image =  Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    image.then((res:any)=>{
      this.gambar = res.webPath;
      this.gambarnya.nativeElement.src = this.gambar;
      this.blob = this.readAsBase64(this.gambar);
      console.log(this.blob); 
    })
  }

  private async readAsBase64(cameraPhoto: any) {
    const response = await fetch(cameraPhoto);
    const blob = await response.blob();
    return await this.convertBlobToBase64(blob) as string;  
  }
  
  convertBlobToBase64 = (blob: Blob) => 
    new Promise(
      (resolve, reject) => {
      const reader = new FileReader;
      reader.onerror = reject;
      reader.onload = () => {
          resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  }

// https://jsmobiledev.com/article/ionic-camera/
// npm install @capacitor/camera
// npm i webpack
// npm i @ionic/pwa-elements
// https://stackoverflow.com/questions/18650168/convert-blob-to-base64
// npm i @capacitor/preferences @capacitor/filesystem