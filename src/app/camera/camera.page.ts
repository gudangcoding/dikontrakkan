import { Component, OnInit,ViewChild,ElementRef  } from "@angular/core";
import { Camera, CameraResultType } from '@capacitor/camera';
import { restApi } from "src/provider/restApi";
import { Buffer } from 'buffer';



@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  
 gambar:any=[];
 img:any=[];
  constructor(private api:restApi) { }
  @ViewChild('gambarnya') gambarnya!: ElementRef;
  
  ngOnInit(): void {
  }

   takePicture() {
    const image =  Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    }).then((res:any)=>{
      this.gambar  = res.dataUrl;
      this.gambarnya.nativeElement.src = this.gambar;
      console.log(this.gambar);
    },(err)=>{
        console.log(err); 
    })
  }
  




    takePicture2()  {
    const image =  Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    }).then((res:any)=>{
      this.gambar  = res.webPath;
      const blob =  fetch(res.webPath).then(r => r.blob());
      
      this.gambarnya.nativeElement.src = this.gambar; 
    },(err)=>{
        console.log(err); 
    });
  
    
  };
  
 

  

  simpan(){
    console.log(Blob);
    
  }

  takepoto3(){
    const image =  Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    }).then((res:any)=>{
      const hasil : string = Buffer.from(res.dataUrl, 'utf8').toString('base64');
      this.gambarnya.nativeElement.src = hasil;
      console.log(hasil); 
    });
    
    
  }
}

//https://jsmobiledev.com/article/ionic-camera/
//kode phpnya
// $entry = base64_decode($post['gambar']);
// $image = imagecreatefromstring($entry);

// $tgl = date('Y-m-d_H-i-s');
// $directory = "images/post/post_".$tgl.".jpg"; 
// imagejpeg($image, $directory);
// imagedestroy($image);