import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { MapboxViewApi} from "nativescript-mapbox";
import { Page } from 'tns-core-modules/ui/page/page';
import { UtilService } from '~/app/shared/services/service.index';

@Component({
  selector: 'ns-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  
  public img:String;
  public name: string;
  public email: string;
  public phone_numbers: string;
  public address: string;
  public information: string;
  public description: string;
  public legal: string;
  public long: number;
  public lat: number;
  public entrance:string;
  public exit:string;
  private map: MapboxViewApi;
  public tokenMapBox:string; 
  public isLoading: boolean = false;

  constructor(private page: Page, public _utilService:UtilService, private router:RouterExtensions) {
  }
  
  ngOnInit() {
    this.tokenMapBox = 'pk.eyJ1IjoiYW5kcmVzc2FsZ2Fkb2MxIiwiYSI6ImNrMXRyN2c2bDAxZHUzb3FmcmRpdWIwdDIifQ.uT9V4dExJjvVNRWPQaZT_Q'
    this.page.actionBarHidden = true;
    this.isLoading = true;
    this._utilService.getInformation().subscribe(res=>{
      this.long = res.location.longitude;
      this.lat = res.location.latitude;
      this.img = res.pic;
      this.name = res.name;
      this.email = res.email;
      this.phone_numbers = res.phone_numbers;
      this.address = res.location.address;
      this.information = res.information;
      this.description = res.description;
      this.legal = res.legal;
      this.entrance = res.office_hours.entrance;
      this.exit = res.office_hours.exit;
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    });
  }

  /**
   * Función que permite crear un marcador en mapbox
   * @param args Event 
   */
  onMapReady(args): void {
    this.map = args.map;
    this.map.addMarkers([
      {
        lat: this.lat,
        lng: this.long,
        title: this.name,
        subtitle: `${this.entrance} - ${this.exit}`,
        selected: true, 
      }
    ]);
  }

  /**
   * Función que permite regresar a la pantalla anterior
   */
  onBack(){
    this.router.back();
  }

}
