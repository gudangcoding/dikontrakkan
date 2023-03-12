import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  
 gambar:any=[];
 img:any;
  constructor(elementRef: ElementRef) { }
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
      this.gambarnya.nativeElement.src = "data:image/jpeg;base64,"+this.gambar;
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
      this.gambarnya.nativeElement.src = this.gambar;
      console.log(this.gambar);
    },(err)=>{
        console.log(err); 
    });
  
    
  };
}

//https://jsmobiledev.com/article/ionic-camera/
//kode phpnya
// $entry = base64_decode($post['gambar']);
// $image = imagecreatefromstring($entry);

// $tgl = date('Y-m-d_H-i-s');
// $directory = "images/post/post_".$tgl.".jpg"; 
// imagejpeg($image, $directory);
// imagedestroy($image);