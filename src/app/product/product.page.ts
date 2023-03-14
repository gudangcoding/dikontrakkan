import { Component, OnInit,ViewChild,ElementRef  } from "@angular/core";
import { Camera, CameraResultType } from '@capacitor/camera';
import { restApi } from 'src/provider/restApi';
import { Storage } from '@ionic/storage';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  gambar:any=[];
  img:string="";
  gambarDisplay:any=[];
  image:string="";
  imageDisplay:string="";
  product:any=[];
  anggota: any;
  server: string ="";
  start: number = 0;
  perpage: number = 5;
  poto: any;
  cat_id:any;
  name:any;
  desc:any;
  price:any;
  tes:string="";
  video_url:any;
  @ViewChild('gambarnya') gambarnya!: ElementRef;
  constructor(
    private api : restApi, 
    private storage:Storage,
    ) {
    this.server = this.api.server;
    this.image = Buffer.from(this.gambar, 'utf8').toString('base64');
   }

  ngOnInit() {
    
    this.product = [];
    this.start = 0;
    this.storage.get('member').then((res)=>{
    this.anggota = res;
    this.load();
   });
  }

  load(){    
    return new Promise(resolve => {  
      let body = {
        username : this.anggota.username,
        password : this.anggota.password,
        member: this.anggota.id_member,
        start: this.start,
        limit: this.perpage
      };

      this.api.post(body, 'index.php?m=product').subscribe((res:any) => {
        console.log(res.result);
        // this.image = 'data:image/jpeg;base64,' + this.imagebase64;
        for(let post of res.result){
          this.product.push(post);
        }
        resolve(true);
      });
    });
  }

  doInfinite(event:any) {
     this.start += this.perpage;   
     this.load().then(()=>{
      event.complete();
     });
  }

  ambilfoto()  {
    const image =  Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    image.then((res:any)=>{
      this.gambar  = res.webPath;
      this.gambarnya.nativeElement.src = this.gambar;
      console.log(this.gambar);
    },(err)=>{
        console.log(err); 
    });  
    
  }

  simpan(){
    let body={
      cat_id:this.cat_id,
      name:this.name,
      desc:this.desc,
      price:this.price,
      image:this.image,
      video_url:this.video_url
    }
    this.api.post(body,'index.php?m=product&a=post').subscribe((res:any)=>{
      console.log(res.result);
      
    });
  }

  ambilfoto2(){
    const image =  Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      saveToGallery:true,
      resultType: CameraResultType.DataUrl
    });
    image.then((res:any)=>{
      this.gambar = res.dataUrl;
      this.gambarnya.nativeElement.src = this.gambar;
      this.image = Buffer.from(this.gambar, 'utf8').toString('base64');
      console.log(this.image); 
      //return hasil;
    })
  }

}
