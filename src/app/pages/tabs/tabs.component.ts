import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page';

@Component({
  selector: 'Tabs',
  moduleId: module.id,
  templateUrl: `tabs.component.html`,
  styleUrls:['tabs.component.css']
})
export class TabsComponent implements OnInit {

  constructor(
    private router: RouterExtensions,
    private active: ActivatedRoute,
    private page: Page
  ){}

  ngOnInit(){

    this.router.navigate(
      [
        {
          outlets: {
            productosTab: ['productos'],
            cotizacionesTab: ['cotizaciones'],
            perfilTab: ['perfil']
          }
        }
      ],
      {
        relativeTo: this.active
      }
    );

    this.page.actionBarHidden = true;

  }
        


}