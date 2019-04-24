import { Component,  OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'Tabs',
  moduleId: module.id,
  templateUrl: `tabs.component.html`,
  styleUrls:['tabs.component.css']
})
export class TabsComponent implements OnInit {

  isLoading = false;

  constructor(private page: Page){
    this.page.actionBarHidden = true;
  }

  ngOnInit(){
    
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);

  }
        


}