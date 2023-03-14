import { Component } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private storage:Storage,
    private router: Router, 
    ) {
      //this.cekLogin()
    }
 
   cekLogin(){
      this.storage.get('token').then((res)=>{
        console.log('Token anda : '+res);
        if(res == null){
          this.router.navigateByUrl('/login', { replaceUrl: true });
        }else{
          this.router.navigateByUrl('/home', { replaceUrl: true });
        }
      });
   }


  logout(){
    this.storage.clear();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
//install
// npm install @ionic/storage
// ganti di package.json jadi versi 2.1.3
// dan setting di app.module.ts
// imports: [IonicModule.forRoot()],
