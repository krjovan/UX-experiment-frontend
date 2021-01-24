import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ExperimentService } from '../../services/experiment.service';

@Component({
  selector: 'app-eksperiment',
  templateUrl: './eksperiment.component.html',
  styleUrls: ['./eksperiment.component.css']
})
export class EksperimentComponent implements OnInit {
  title = 'UX-experiment-frontend';

  prviPdf = this.experimentService.myBackEnd()+'/pdfs/f';
  drugiPdf = this.experimentService.myBackEnd()+'/pdfs/s';

  //redosled kojim ce se izvrsavati testovi, uzima vrednost 1 ili 2
  //ako je redosled 1 onda se izvrsava prvi pa drugi layout, a ako
  //je redosled 2 onda se izvrsava drugi pa prvi layout
  redosled = Math.floor(Math.random() * 2) + 1;


  isChrome = this.browser() == "Google Chrome";
  isFirefox =  this.browser() == "Mozilla Firefox";

  mobile=(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||(!this.isChrome&&!this.isFirefox));
  showIntro = (!this.mobile);
  showPhonePage = (this.mobile);
  showFirstLayout = false;
  showSecondLayout = false;
  showUtisci = false;
  showThanks = false;

  godineIskustva: number;
  satiDnevno: number;
  profesija: boolean;
  iskustvoKatastar: boolean;

  firstLokUlicaIBroj: string = '';
  firstLokMesto: string = '';
  firstLokBrKatParcele: string = '';
  firstLokPovKatParcele: string = '';
  firstLokBrObjekataNaParceli: string = '';
  firstPodnosiocImePrez: string = '';
  firstPodnosiocAdresa: string = '';
  firstPodnosiocJmbg: string = '';
  firstDostavaEmail: string = '';
  firstDostavaMobilni: string = '';

  secondLokUlicaIBroj: string = '';
  secondLokMesto: string = '';
  secondLokBrKatParcele: string = '';
  secondLokPovKatParcele: string = '';
  secondLokBrObjekataNaParceli: string = '';
  secondPodnosiocImePrez: string = '';
  secondPodnosiocAdresa: string = '';
  secondPodnosiocJmbg: string = '';
  secondDostavaEmail: string = '';
  secondDostavaMobilni: string = '';

  subjekatPreferira: string;
  subjekatMisljenje: string;


  firstLayoutWindow;
  secondLayoutWindow;

  firstStartTime;
  firstEndTime;

  secondStartTime;
  secondEndTime;

  constructor(private experimentService:ExperimentService) { 

    console.log("sta si",this.isChrome,this.isFirefox);
  }
  ngOnInit() {
    
  }
  onResize(event){
    let nmobile=(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||(!this.isChrome&&!this.isFirefox));
    this.showIntro = (!nmobile);
    this.showPhonePage = (nmobile);
    this.showFirstLayout = false;
    this.showSecondLayout = false;
    this.showUtisci = false;
    this.showThanks = false;
  }
  zapocniEksperiment() {
    this.showIntro = false;
    if(this.redosled === 1) {
      this.firstLayoutWindow = window.open(this.prviPdf, "_blank");
      this.showFirstLayout = true;
      this.firstStartTime = performance.now();
      window.scrollTo(0, 0);
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
      this.showFirstLayout = false;
      this.firstLayoutWindow.close();
      this.showUtisci = true;
    } else {
      this.firstEndTime = performance.now();
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
      this.showSecondLayout = false;
      this.secondLayoutWindow.close();
      this.showUtisci = true;
    } else {
      this.secondEndTime = performance.now();
      this.showSecondLayout = false;
      this.secondLayoutWindow.close();
      this.firstLayoutWindow = window.open(this.prviPdf, "_blank");
      this.showFirstLayout = true;
      this.firstStartTime = performance.now();
      window.scrollTo(0, 0);
    }
  }

  predajUtiske() {
    this.showUtisci = false;
    this.showThanks = true;
    this.sendExperimentScore();
  }

  sendExperimentScore() {

    var experiment = {
      'godineIskustva': this.godineIskustva,
      'satiDnevno': this.satiDnevno,
      'profesija': this.profesija,
      'iskustvoKatastar': this.iskustvoKatastar,

      'redosled': this.redosled,

      'firstLokUlicaIBroj': this.firstLokUlicaIBroj,
      'firstLokMesto': this.firstLokMesto,
      'firstLokBrKatParcele': this.firstLokBrKatParcele,
      'firstLokPovKatParcele': this.firstLokPovKatParcele,
      'firstLokBrObjekataNaParceli': this.firstLokBrObjekataNaParceli,
      'firstPodnosiocImePrez': this.firstPodnosiocImePrez,
      'firstPodnosiocAdresa': this.firstPodnosiocAdresa,
      'firstPodnosiocJmbg': this.firstPodnosiocJmbg,
      'firstDostavaEmail': this.firstDostavaEmail,
      'firstDostavaMobilni': this.firstDostavaMobilni,
      'firstLayoutTime': Math.round((this.firstEndTime - this.firstStartTime)/1000),

      'secondLokUlicaIBroj': this.secondLokUlicaIBroj,
      'secondLokMesto': this.secondLokMesto,
      'secondLokBrKatParcele': this.secondLokBrKatParcele,
      'secondLokPovKatParcele': this.secondLokPovKatParcele,
      'secondLokBrObjekataNaParceli': this.secondLokBrObjekataNaParceli,
      'secondPodnosiocImePrez': this.secondPodnosiocImePrez,
      'secondPodnosiocAdresa': this.secondPodnosiocAdresa,
      'secondPodnosiocJmbg': this.secondPodnosiocJmbg,
      'secondDostavaEmail': this.secondDostavaEmail,
      'secondDostavaMobilni': this.secondDostavaMobilni,
      'secondLayoutTime': Math.round((this.secondEndTime - this.secondStartTime)/1000),

      'subjekatPreferira': this.subjekatPreferira,
      'subjekatMisljenje': this.subjekatMisljenje
    };

    console.log(experiment);

    this.experimentService.addExperiment(experiment).subscribe({
      next: data => {
        console.log("Podaci poslati!");
      },
      error: error => {
        console.log(error);
      }
    });
  }

  browser () {
    var test = function(regexp) {return regexp.test(window.navigator.userAgent)}
    switch (true) {
        case test(/edg/i): return "Microsoft Edge";
        case test(/trident/i): return "Microsoft Internet Explorer";
        case test(/firefox|fxios/i): return "Mozilla Firefox";
        case test(/opr\//i): return "Opera";
        case test(/ucbrowser/i): return "UC Browser";
        case test(/samsungbrowser/i): return "Samsung Browser";
        case test(/chrome|chromium|crios/i): return "Google Chrome";
        case test(/safari/i): return "Apple Safari";
        default: return "Other";
    }
  };
}


