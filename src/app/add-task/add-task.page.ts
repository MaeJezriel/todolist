import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { TaskService, Task } from '../services/task.service';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {

  // @Input() task: Task;
  // isUpdate = false; //check if tthe modal is used for update or not
  nameVal: string = "";
  emailVal: string = "";

  // data = {
  //   title: '',
  //   subtitle: '',
  //   content: '',
  // };

 

  constructor(private modalCtrl: ModalController,
    private crud: CrudService) {
      this.crud.databaseConn(); 
     }

  ngOnInit() {
    // if (this.task){
    //   this.isUpdate = true;
    //   this.data = this.task;
    // }
  }

  ionViewDidEnter() {  
    this.crud.getAllUsers()
  }
   
  createUser(){
    this.crud.addItem(this.nameVal, this.emailVal);
  }
   
  remove(user) {
    this.crud.deleteUser(user);
  }
 
   public dismiss(): void {
     this.modalCtrl.dismiss();
  }

}