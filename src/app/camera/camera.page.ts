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
  
  gambar:any="";
  hasil : any;
  constructor(
    private api:restApi, 
    // private storage: Storage
    ) { 
    
  }
  @ViewChild('gambarnya') gambarnya!: ElementRef;
  
  ngOnInit(): void {
    
  }

  
  sendpoto(){
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
      //this.hasil = this.blobToBase64(this.gambar);
      //this.hasil = Buffer.from(res.webPath, 'utf8').toString('base64');
      this.gambarnya.nativeElement.src = this.gambar;
      console.log(this.gambar); 
    })
    
  }

  blobToBase64(blob:Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
}

// https://jsmobiledev.com/article/ionic-camera/
// npm install @capacitor/camera
// npm i webpack
// npm i @ionic/pwa-elements
// https://stackoverflow.com/questions/18650168/convert-blob-to-base64
// npm i @capacitor/preferences @capacitor/filesystem