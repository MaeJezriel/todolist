import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage {

 
  constructor(private modalController: ModalController) {}
 
  public dismiss(): void {
    this.modalController.dismiss();
  }
}