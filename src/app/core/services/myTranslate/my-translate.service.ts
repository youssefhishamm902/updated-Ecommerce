import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {TranslateService} from '@ngx-translate/core'
@Injectable({
  providedIn: 'root'
})
export class MyTranslateService {
  currentLang: string | undefined;

// this service is not for a component that's why it will be implemented inside the constructor not the component live cycle hook (ngOnInit)



  constructor(private translateService : TranslateService, @Inject(PLATFORM_ID) private ID: Object) {
 
    if(isPlatformBrowser(ID)){
         // 1) set default value

          translateService.setDefaultLang('en');
         // 2) get language from localstorage
         let savedLang = localStorage.getItem('lang');
 
        // 2) Use Language
        if (savedLang) {
        translateService.use(savedLang!);
       }

        this.changeDirection();

       }

    }

  // search for renderer2 Factory has better performance instead of using document.documentElement (don't acces the html document directly)

   changeDirection():void{
    if(localStorage.getItem('lang') === 'en') {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');

    } else if(localStorage.getItem('lang') === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    }
   }


   changeLanguage(lang:string){
    // 1) save localstorage == lang 

    localStorage.setItem('lang', lang);


    // 2) use language 
    this.translateService.use(lang);


    // 3) change Direction
    this.changeDirection

   }
}
