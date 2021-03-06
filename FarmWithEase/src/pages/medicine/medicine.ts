import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { MedicineAddProvider } from '../../providers/medicine-add/medicine-add';


@Component({
  selector: 'page-medicine',
  templateUrl: 'medicine.html'
})
export class medicinePage {
  medicines: any;

  column: string = 'name';

  terms: any="";

  constructor(public medicineService: MedicineAddProvider,public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    
  }
  
  ionViewDidLoad(){

    this.medicineService.getMedicine().then((data) => {
      this.medicines = data;
    });

  }
  
 
 
  createMedicine(){

    let prompt = this.alertCtrl.create({
      title: 'Medicine',
      inputs: [
        {
          name: 'tagNum',
          placeholder: 'Tag Number'
        },
        {
          name: 'name',
          placeholder: 'Medicine bottle name'
        },
        {
          name: 'dosage',
          placeholder: "Amount used (ML)"
        },
        {
          name: 'date',
          placeholder: 'Date used'
        },
        {
          name: 'reason',
          placeholder: 'Reason'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.medicineService.createMedicine({
              tagNum: data.tagNum, 
              date: data.date, 
              name: data.name, 
              dosage: data.dosage,
              reason: data.reason
            });
          }
        }
      ]
    });

    prompt.present();

  }

  deleteMedicine(medicine){
    this.medicineService.deleteMedicine(medicine);
  }
 
}
