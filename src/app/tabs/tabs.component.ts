import { Component } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'Tabs',
  moduleId: module.id,
  templateUrl: `tabs.component.html`
})
export class TabsComponent {

  constructor(private page: Page){
    this.page.actionBarHidden = true;
}
}