import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ExperimentService } from './services/experiment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UX-experiment-frontend';

  prviPdf = 'http://localhost:8080/pdfs/f';
  drugiPdf = 'http://localhost:8080/pdfs/s';

  //redosled kojim ce se izvrsavati testovi, uzima vrednost 1 ili 2
  //ako je redosled 1 onda se izvrsava prvi pa drugi layout, a ako
  //je redosled 2 onda se izvrsava drugi pa prvi layout
  redosled = Math.floor(Math.random() * 2) + 1;

  showIntro = true;
  showFirstLayout = false;
  showSecondLayout = false;
  showThanks = false;

  godineIskustva: number;
  satiDnevno: number;
  profesija: boolean;
  iskustvoKatastar: boolean;

  jmbg: string = '';
  ime: string = '';
  prezime: string = '';

  firstLayoutWindow;
  secondLayoutWindow;

  firstStartTime;
  firstEndTime;

  secondStartTime;
  secondEndTime;

  constructor(private experimentService:ExperimentService) { }

  zapocniEksperiment() {
    this.showIntro = false;
    if(this.redosled === 1) {
      this.firstLayoutWindow = window.open(this.prviPdf, "_blank");
      this.showFirstLayout = true;
      this.firstStartTime = performance.now()
    } else if(this.redosled ===2) {
      this.secondLayoutWindow = window.open(this.drugiPdf, "_blank");
      this.showSecondLayout = true;
      this.secondStartTime = performance.now();
    } else {
      console.log("Nesto neocekivano se dogodilo.");
    }
  }

  predajPrviLayout() {
    if(this.redosled === 2) {
      this.firstEndTime = performance.now();
      console.log(Math.round((this.firstEndTime - this.firstStartTime)/1000));
      this.showFirstLayout = false;
      this.firstLayoutWindow.close();
      this.showThanks = true;
      //this.sendExperimentScore();
    } else {
      this.firstEndTime = performance.now();
      console.log(Math.round((this.firstEndTime - this.firstStartTime)/1000));
      this.showFirstLayout = false;
      this.firstLayoutWindow.close();
      this.secondLayoutWindow = window.open(this.drugiPdf, "_blank");
      this.showSecondLayout = true;
      this.secondStartTime = performance.now();
    }
  }

  predajDrugiLayout() {
    if(this.redosled === 1) {
      this.secondEndTime = performance.now();
      console.log(Math.round((this.secondEndTime - this.secondStartTime)/1000));
      this.showSecondLayout = false;
      this.secondLayoutWindow.close();
      this.showThanks = true;
      //this.sendExperimentScore();
    } else {
      this.secondEndTime = performance.now();
      console.log(Math.round((this.secondEndTime - this.secondStartTime)/1000));
      this.showSecondLayout = false;
      this.secondLayoutWindow.close();
      this.firstLayoutWindow = window.open(this.prviPdf, "_blank");
      this.showFirstLayout = true;
      this.firstStartTime = performance.now()
    }
  }

  sendExperimentScore() {
    var experiment = {
      'redosled': this.redosled,
      'layoutTime1': Math.round((this.firstEndTime - this.firstStartTime)/1000),
      'layoutTime2': Math.round((this.secondEndTime - this.secondStartTime)/1000)
    };

    this.experimentService.addExperiment(experiment).subscribe({
      next: data => {
        console.log("Podaci poslati!");
      },
      error: error => {
        console.log(error);
      }
    });
  }
}
