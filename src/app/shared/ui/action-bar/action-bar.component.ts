import { Component, OnInit, Input } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { isAndroid } from "tns-core-modules/platform";
import { RouterExtensions } from 'nativescript-angular/router';

declare var android: any;

@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css'],
  moduleId: module.id,
})
export class ActionBarComponent implements OnInit {

  @Input() title: string;
  @Input() class: string;
  @Input() showBackButton = true;
  
  constructor(private page: Page, private router: RouterExtensions) { }

  ngOnInit() {
  }



  get canGoBack(){
    return this.router.canGoBack() && this.showBackButton;
  }

  onGoBack(){
    this.router.backToPreviousPage();
  }

  onLoadedActionBar() {
    if (isAndroid) {
      const androidToolbar = this.page.actionBar.nativeView;
      const backButton = androidToolbar.getNavigationIcon();
      if (backButton) {
        backButton.setColorFilter(
          android.graphics.Color.parseColor('#ffffff'),
          (<any>android.graphics).PorterDuff.Mode.SRC_ATOP
        );
      }
    }
  }

}
