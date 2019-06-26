import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page';
import { UsuarioService } from '~/app/shared/services/service.index';

@Component({
  selector: 'Tabs',
  moduleId: module.id,
  templateUrl: `tabs.component.html`,
  styleUrls:['tabs.component.css']
})
export class TabsComponent implements OnInit {
  
  isLoading= false;

  constructor(
    private router: RouterExtensions,
    private active: ActivatedRoute,
    private page: Page,
    private _us: UsuarioService
  ){}

  ngOnInit(){
    this._us.cargaLocalData();
    this.loadTabRoutes();
    this.page.actionBarHidden = true;
  }
        
  private loadTabRoutes() {
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
  }

}