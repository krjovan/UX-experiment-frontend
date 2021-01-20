import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  jmbg: string = '';
  ime: string = '';
  prezime: string = '';

  firstLayoutWindow;
  secondLayoutWindow;

  firstStartTime;
  firstEndTime;

  secondStartTime;
  secondEndTime;

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
}
