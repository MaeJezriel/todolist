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
 
  // ngOnInit() {
  //   this.service.getAll().subscribe(response =>  {
  //    this.tasks = response;
  //   })
  // }

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

  // addtaskmodal() {
  //   this.modalCtrl
  //  .create({
  //    component: AddTaskPage,
  //    cssClass: "my-custom-class"
  //   })
  // }

  async addtaskmodal() {
    const modal = await this.modalCtrl.create({
      component: AddTaskPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}

//     addtaskmodal() {
//   const modal = await this.modalController.create({
//     component: RegisterTermPage,
//     cssClass: "my-custom-class"
//   });
//   return await modal.present();
// }


    

  // updateTask(task:Task) {
  //   this.modalCtrl.create({
  //     component: AddTaskPage,
  //     componentProps: {task} //shot hand of {task: task}
  //     //Pass the task object to the modal
  //   })
  //   .then(modal => {
  //    modal.present();
  //    return modal.onDidDismiss();
  //   }).then(({data, role}) => {
  //     this.tasks = this.tasks.filter(std => {
  //       if(data.id === std.id) {
  //         return data; //return updated
  //       }
  //       return std;
  //     })
  //   });
  // }


  // removeTask(id: string){
  //   this.alertCtrl.create({
  //     header: 'Delete',
  //     message: 'Are you sure you want to delete?',
  //     buttons: [{
  //       text: 'Yes',
  //       handler: () => {
  //         this.service.remove(id).subscribe(() =>{
  //           this.tasks = this.tasks.filter(std => std.id !== id);
  //       });
  //     }
  //     }, 
  //     { text: 'No' } 
  //   ]
  //   }) .then(alertEl => alertEl.present());
  // }

   



