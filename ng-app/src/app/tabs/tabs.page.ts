import { Component, OnInit, OnDestroy } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { StateService } from '../shared/state.service';
import { ToastController } from '@ionic/angular';
import { tap } from 'rxjs/operators';

const { Share } = Plugins;
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit, OnDestroy {

  url: string = null;
  favorite: boolean;

  constructor(
    private state: StateService,
    private toastController: ToastController
  ) { }


  ngOnInit() {
    this.state.activeSlide
    .pipe(
      tap( x => console.log('sub ctive slide', x))
    )
    .subscribe( slide => {
      this.url = slide ? slide.url : '';
    });
  }

  ngOnDestroy() {
    this.state.activeSlide.unsubscribe();
  }

  async handleShareTapped() {
    console.log('tapped');
    await Share.share({
      dialogTitle: 'Nachricht teilen mit...',
      title: 'Nachricht teilen mit...',
      url: this.url,
    }).catch( err => {
      this.noSharingOptionsAvailable();
    });
  }

  private async noSharingOptionsAvailable() {
    const toast = await this.toastController.create({
      header: 'Oops',
      message: 'Keine Funktion zum Teilen verfügbar',
      position: 'middle',
      // color: 'warn',
      duration: 3000
    });

    toast.present();
  }

}
