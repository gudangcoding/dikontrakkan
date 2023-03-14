import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { restApi } from 'src/provider/restApi';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  first_name:any;
  last_name:any;
  email:any;
  hp:any;
  otp:any;
  username:any="";
  password:any="";
  constructor(
    private api:restApi,
    private storage:Storage,
    private router: Router,
    private alertCtrl : AlertController) { }

  ngOnInit() {
  }

  login(){
    if(/^[a-zA-Z0-9]+$/.test(this.username)){
      if(this.username != "" && this.password != ""){
        let body = {
          username: this.username,
          password: this.password,
        };

        this.api.post(body, 'login.php').subscribe((data:any) => {
          if(data.success){
             this.storage.set('member', data.result);
             this.router.navigate(['home']);
          }
          else this.notif('Error', data.msg);
          console.log(data);
        });
      }else{
        this.notif('Error', 'Username atau Password kosong!');
      }
    }else{
      this.notif('Error', 'Username tidak valid!');
    }
  }

  daftar(){
    let body = {
      username : this.username,
      password : this.password
    }
    this.api.post(body,'daftar.php').subscribe((res:any)=>{
      console.log(res);
      
    })
  }

  resetPassword(){
    let body = {
      username : this.username,
      password : this.password
    }
    this.api.post(body,'reset.php').subscribe((res:any)=>{
      console.log(res);
      
    })
  }

  kirimOTP(){

  }

  async notif(judul:any,message:any) {
    const alert = await this.alertCtrl.create({
      header: judul,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
