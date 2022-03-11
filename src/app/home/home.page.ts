import { Component, OnInit} from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AddTaskPage } from '../add-task/add-task.page';
import { Task, TaskService } from '../services/task.service';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  //tasks: Task[];
  nameVal: string = "";
  emailVal: string = "";

  
  // constructor(private modalCtrl: ModalController,  private alertCtrl: AlertController, private service: TaskService) {}
  constructor(
    private crud: CrudService,
    private modalCtrl: ModalController
   ) {
     this.crud.databaseConn(); 
   }
 
  ngOnInit() { }

  ionViewDidEnter() {  
    this.crud.getAllUsers()
  }
   
  createUser(){
    this.crud.addItem(this.nameVal, this.emailVal);
  }
   
  remove(user) {
    this.crud.deleteUser(user);
  }


  async addtaskmodal() {
    const modal = await this.modalCtrl.create({
      component: AddTaskPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}


    

 
   



