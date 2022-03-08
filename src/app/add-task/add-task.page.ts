import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { TaskService, Task } from '../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {

  @Input() task: Task;
  isUpdate = false; //check if tthe modal is used for update or not


  data = {
    title: '',
    subtitle: '',
    content: '',
  };

 

  constructor(private modalCtrl: ModalController,
    private service: TaskService) { }

  ngOnInit() {
    if (this.task){
      this.isUpdate = true;
      this.data = this.task;
    }
  }

  onSubmit(form: NgForm){
    const task = form.value;
    if(this.isUpdate){
      this.service.update(task, this.task.id).subscribe(() => {
        task.id = this.task.id; //append id to the updated task object
        this.modalCtrl.dismiss(task, 'updated');
      })

    } else {
    this.service.create(task).subscribe(response => {
      //Pass data back and close modal
      this.modalCtrl.dismiss(response, 'created');

    });
  }
}

 
  // public dismiss(): void {
  //   this.modalController.dismiss();
  // }

}