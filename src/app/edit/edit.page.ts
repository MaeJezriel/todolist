import { Component, OnInit } from '@angular/core';
import { CrudService } from '../crud.service';
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})

export class EditPage implements OnInit {
  id: any;
  nameVal: string = "";
  emailVal: string = "";

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private crud: CrudService,
    private modalCtrl: ModalController
  ) { 
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.crud.getUser(this.id).then((res) => {
      this.nameVal = res['name'];
      this.emailVal = res['email']; 
    })
  }

  ngOnInit() { }

  public dismiss(): void {
    this.modalCtrl.dismiss();
 }


  onUpdate() {
     this.crud.updateUser(this.id, this.nameVal, this.emailVal).then(() => {
        this.router.navigate(['/home']);
     })
  }

 
}