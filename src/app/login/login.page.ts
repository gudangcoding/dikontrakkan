import { Component, OnInit } from '@angular/core';
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
  constructor(private api:restApi,private storage:Storage) { }

  ngOnInit() {
  }

  login(){
    let body = {
      username : this.username,
      password : this.password
    }
    this.api.post(body,'login.php').subscribe((res:any)=>{
      console.log(res); 
    })
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
}
