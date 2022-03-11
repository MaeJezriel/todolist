import { Injectable } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  
  private dbInstance: SQLiteObject;
  readonly db_name: string = "todo.db";
  readonly db_table: string = "todoTable";
  USERS: Array <any> ;

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private router: Router,
    public alertController: AlertController,
    public modalController: ModalController    
  ) { 
    this.databaseConn();
  }

    // Create SQLite database 
    databaseConn() {
        this.platform.ready().then(() => {
          this.sqlite.create({
              name: this.db_name,
              location: 'default'
            }).then((sqLite: SQLiteObject) => {
              this.dbInstance = sqLite;
              sqLite.executeSql(`
                  CREATE TABLE IF NOT EXISTS ${this.db_table} (
                    user_id INTEGER PRIMARY KEY, 
                    name varchar(255),
                    email varchar(255)
                  )`, [])
                .then((res) => {
                  // alert(JSON.stringify(res));
                })
                .catch((error) => alert(JSON.stringify(error)));
            })
            .catch((error) => alert(JSON.stringify(error)));
        });   
    }

    // Crud
    public addItem(n, e) {
      // validation
      if (!n.length || !e.length) { 
        alert('Provide both email & name');
        return;
      }
      this.dbInstance.executeSql(`
      INSERT INTO ${this.db_table} (name, email) VALUES ('${n}', '${e}')`, [])
        .then(() => {
          //alert("Success");
          // this.router.navigate(['/home']);
          this.getAllUsers();
          this.successAlert();
         
        }, (e) => {
          alert(JSON.stringify(e.err));
        });
    }

    getAllUsers() {
      return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table}`, []).then((res) => {
        this.USERS = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            this.USERS.push(res.rows.item(i));
          }
          return this.USERS;
        }
      },(e) => {
        alert(JSON.stringify(e));
      });
    }

    async successAlert() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Success!',
        message: 'You have successfully added new note .',
        buttons: [
          {
            text: 'Great!',
            handler: () => {
              this.dismissModal();
              //this.sendMessage(); // For Realtime pulling
              this.router.navigate(['/home']);
            }
          }
        ]
      });
    await alert.present();
  }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

    // Get user
    getUser(id): Promise<any> {
      return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table} WHERE user_id = ?`, [id])
      .then((res) => { 
        return {
          user_id: res.rows.item(0).user_id,
          name: res.rows.item(0).name,  
          email: res.rows.item(0).email
        }
      });
    }

    // Update
    updateUser(id, name, email) {
      let data = [name, email];
      return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET name = ?, email = ? WHERE user_id = ${id}`, data)
    }  

    // Delete
    deleteUser(user) {
      this.dbInstance.executeSql(`
      DELETE FROM ${this.db_table} WHERE user_id = ${user}`, [])
        .then(() => {
          //alert("Note deleted!");
          this.getAllUsers();
          this.delAlert();
        })
        .catch(e => {
          alert(JSON.stringify(e))
        });
    }

    async delAlert() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Delete!',
        message: 'You have deleted a note .',
        buttons: [
          {
            text: 'Ok!',
            handler: () => {
              this.dismissModal();
              //this.sendMessage(); // For Realtime pulling
              this.router.navigate(['/home']);
            }
          }
        ]
      });
    await alert.present();
  }

  // dismissModal() {
  //   this.modalController.dismiss({
  //     'dismissed': true
  //   });
  // }

}