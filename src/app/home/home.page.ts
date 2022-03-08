import { Component } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AddTaskPage } from '../add-task/add-task.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private modalController: ModalController) {}

  public async openModal() {
    const selectedModal = await this.modalController.create({
      component:  AddTaskPage ,
      cssClass: "my-custom-class"
    });
    return await selectedModal.present();
  }
}