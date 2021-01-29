import { Component, OnInit } from '@angular/core';
import { timestamp } from 'rxjs/operators';
import { ExperimentService } from '../../services/experiment.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  podaci=[];
  tacni=[];
  gresaka=[];
  ukupnoGresaka=0;
  prikazi;
  openDialog=false;
  greskeNaKraju=false;

  tacniObjOdgPetar={
    DostavaEmail: 'petar@gmail.com',
    DostavaMobilni: '0649468152',
    LokBrKatParcele: '9898/4',
    LokBrObjekataNaParceli: '2',
    LokMesto: 'Novi Sad',
    LokPovKatParcele: '839',
    LokUlicaIBroj: 'Bulevar Oslobođenja 27',
    PodnosiocAdresa: 'Futoška 67, Novi Sad',
    PodnosiocImePrez: 'Petar Petrović',
    PodnosiocJmbg: '2301995740475'
  }

  tacniObjOdgJelena={
    DostavaEmail: 'jelena@hotmail.com',
    DostavaMobilni: '0639654241',
    LokBrKatParcele: '6538/2',
    LokBrObjekataNaParceli: '5',
    LokMesto: 'Beograd',
    LokPovKatParcele: '726',
    LokUlicaIBroj: 'Ruže Jovanovića 78',
    PodnosiocAdresa: 'Simina 36, Beograd',
    PodnosiocImePrez: 'Jelena Jelić',
    PodnosiocJmbg: '1311986815545'
  }
  constructor(private experimentService:ExperimentService) { }

  ngOnInit(): void {
    this.experimentService.getExperiments().subscribe({
      next: data => {
        this.podaci=data;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  aktivirajDetalje(obj){
    this.tacni=[];
    if(obj.redosled==2){
      this.tacni.push(this.tacniObjOdgPetar);
      this.tacni.push(this.tacniObjOdgJelena);
    }else{
      this.tacni.push(this.tacniObjOdgPetar);
      this.tacni.push(this.tacniObjOdgJelena);
    }
    this.gresaka=this.racunajGresku(obj);
    this.ukupnoGresaka = this.gresaka.reduce(function(a, b) { return a + b; }, 0);
    this.prikazi=obj;
    this.openDialog=true;
  }
  closeDialog(){
    this.openDialog=false;
  }

  racunajGresku(obj){
    let tacniObj=[];
    let nizGresaka=[];
    //redosled == 2 prvo ide Petar
    if(obj.redosled==2){
      tacniObj.push(this.tacniObjOdgPetar);
      tacniObj.push(this.tacniObjOdgJelena);
    }else{
      tacniObj.push(this.tacniObjOdgPetar);
      tacniObj.push(this.tacniObjOdgJelena);
    }
    nizGresaka=[];
    nizGresaka.push(this.stringDistance(obj.firstDostavaEmail,tacniObj[0].DostavaEmail));
    nizGresaka.push(this.stringDistance(obj.firstDostavaMobilni,tacniObj[0].DostavaMobilni));
    nizGresaka.push(this.stringDistance(obj.firstLokBrKatParcele,tacniObj[0].LokBrKatParcele));
    nizGresaka.push(this.stringDistance(obj.firstLokBrObjekataNaParceli,tacniObj[0].LokBrObjekataNaParceli));
    nizGresaka.push(this.stringDistance(obj.firstLokMesto,tacniObj[0].LokMesto));
    nizGresaka.push(this.stringDistance(obj.firstLokPovKatParcele,tacniObj[0].LokPovKatParcele));
    nizGresaka.push(this.stringDistance(obj.firstLokUlicaIBroj,tacniObj[0].LokUlicaIBroj));
    nizGresaka.push(this.stringDistance(obj.firstPodnosiocAdresa,tacniObj[0].PodnosiocAdresa));
    nizGresaka.push(this.stringDistance(obj.firstPodnosiocImePrez,tacniObj[0].PodnosiocImePrez));
    nizGresaka.push(this.stringDistance(obj.firstPodnosiocJmbg,tacniObj[0].PodnosiocJmbg));
    nizGresaka.push(this.stringDistance(obj.secondDostavaEmail,tacniObj[1].DostavaEmail));
    nizGresaka.push(this.stringDistance(obj.secondDostavaMobilni,tacniObj[1].DostavaMobilni));
    nizGresaka.push(this.stringDistance(obj.secondLokBrKatParcele,tacniObj[1].LokBrKatParcele));
    nizGresaka.push(this.stringDistance(obj.secondLokBrObjekataNaParceli,tacniObj[1].LokBrObjekataNaParceli));
    nizGresaka.push(this.stringDistance(obj.secondLokMesto,tacniObj[1].LokMesto));
    nizGresaka.push(this.stringDistance(obj.secondLokPovKatParcele,tacniObj[1].LokPovKatParcele));
    nizGresaka.push(this.stringDistance(obj.secondLokUlicaIBroj,tacniObj[1].LokUlicaIBroj));
    nizGresaka.push(this.stringDistance(obj.secondPodnosiocAdresa,tacniObj[1].PodnosiocAdresa));
    nizGresaka.push(this.stringDistance(obj.secondPodnosiocImePrez,tacniObj[1].PodnosiocImePrez));
    nizGresaka.push(this.stringDistance(obj.secondPodnosiocJmbg,tacniObj[1].PodnosiocJmbg));

    return nizGresaka;
  }

  eksportujCSV(){
    let niz=this.podaci;
    let zaCSV;

    if(!this.greskeNaKraju)
      zaCSV=`"Pol","Starosno doba","Godine iskustva","Iskustvo s katastrom","Profesija rad na racunaru","Redosled popunjavanja","Sati dnevno na racunaru","Misljenje subjekta","Sta subjekat preferira",\
"Prva Dostava Email",\
"Prva Dostava Mobilni",\
"Prva Broj Parcele",\
"Prva Objekata na parceli",\
"Prva Mesto",\
"Prva Povrsina parcele",\
"Prva Ulica i Broj",\
"Prva Podnosioc Adresa",\
"Prva Podnosioc Ime Prezime",\
"Prva Podnosioc Jmbg",\
"Prva Provedeno vreme",\
"Drugi Dostava Email",\
"Drugi Dostava Mobilni",\
"Drugi Broj Parcele",\
"Drugi Objekata na parceli",\
"Drugi Mesto",\
"Drugi Povrsina parcele",\
"Drugi Ulica i Broj",\
"Drugi Podnosioc Adresa",\
"Drugi Podnosioc Ime Prezime",\
"Drugi Podnosioc Jmbg",\
"Drugi Provedeno vreme",\
"Greska1",\
"Greska2",\
"Greska3",\
"Greska4",\
"Greska5",\
"Greska6",\
"Greska7",\
"Greska8",\
"Greska9",\
"Greska10",\
"Greska11",\
"Greska12",\
"Greska13",\
"Greska14",\
"Greska15",\
"Greska16",\
"Greska17",\
"Greska18",\
"Greska19",\
"Greska20",\
"Ukupno gresaka\n"
      `;
    else
    zaCSV=`"Pol","Starosno doba","Godine iskustva","Iskustvo s katastrom","Profesija rad na racunaru","Redosled popunjavanja","Sati dnevno na racunaru","Misljenje subjekta","Sta subjekat preferira",\
"Prva Dostava Email",\
"Greska1",\
"Prva Dostava Mobilni",\
"Greska2",\
"Prva Broj Parcele",\
"Greska3",\
"Prva Objekata na parceli",\
"Greska4",\
"Prva Mesto",\
"Greska5",\
"Prva Povrsina parcele",\
"Greska6",\
"Prva Ulica i Broj",\
"Greska7",\
"Prva Podnosioc Adresa",\
"Greska8",\
"Prva Podnosioc Ime Prezime",\
"Greska9",\
"Prva Podnosioc Jmbg",\
"Greska10",\
"Prva Provedeno vreme",\
"Drugi Dostava Email",\
"Greska11",\
"Drugi Dostava Mobilni",\
"Greska12",\
"Drugi Broj Parcele",\
"Greska13",\
"Drugi Objekata na parceli",\
"Greska14",\
"Drugi Mesto",\
"Greska15",\
"Drugi Povrsina parcele",\
"Greska16",\
"Drugi Ulica i Broj",\
"Greska17",\
"Drugi Podnosioc Adresa",\
"Greska18",\
"Drugi Podnosioc Ime Prezime",\
"Greska19",\
"Drugi Podnosioc Jmbg",\
"Greska20",\
"Drugi Provedeno vreme",\
"Ukupno gresaka\n"
    `;

    niz.forEach(el=>{
      let ispisnica=[];
      ispisnica.push(((el.pol=="m")?'Muški':'Ženski'));
      ispisnica.push('"'+el.starosnoDoba+'"');
      ispisnica.push(el.godineIskustva);
      ispisnica.push('"'+((el.iskustvoKatastar)?'Da':'Ne')+'"');
      ispisnica.push('"'+((el.profesija)?'Da':'Ne')+'"');
      ispisnica.push('"'+el.redosled+'"');
      ispisnica.push('"'+el.satiDnevno+'"');
      ispisnica.push('"'+((el.subjekatMisljenje)?el.subjekatMisljenje:'Nema')+'"');
      ispisnica.push('"'+((el.subjekatPreferira=="first")?'Prvi formu':'Drugu formu')+'"');

      var greskice=this.racunajGresku(el);
      this.dodajPrvi(ispisnica,el,greskice);
      this.dodajDrugi(ispisnica,el,greskice);
      if(!this.greskeNaKraju)
        ispisnica.push(greskice);

      let ukupno=greskice.reduce(function(a, b) { return a + b; }, 0)
      ispisnica.push('"'+ukupno+'"');
      zaCSV+=ispisnica.join()+'\n';
    });
    this.downloadFile('podaci.csv', 'data:text/csv;charset=UTF-8,' + encodeURIComponent(zaCSV));

  }

  downloadFile(fileName, urlData) {

    var aLink = document.createElement('a');
    aLink.download = fileName;
    aLink.href = urlData;

    var event = new MouseEvent('click');
    aLink.dispatchEvent(event);
}
  dodajPrvi(ispisnica,el,greskice){
    ispisnica.push('"'+el.firstDostavaEmail+'"');
      if(this.greskeNaKraju)ispisnica.push(greskice[0]);
    ispisnica.push('"'+el.firstDostavaMobilni+'"');
      if(this.greskeNaKraju)ispisnica.push(greskice[1]);
    ispisnica.push('"'+el.firstLokBrKatParcele+'"');
      if(this.greskeNaKraju)ispisnica.push(greskice[2]);
    ispisnica.push('"'+el.firstLokBrObjekataNaParceli+'"');
      if(this.greskeNaKraju)ispisnica.push(greskice[3]);
    ispisnica.push('"'+el.firstLokMesto+'"');
      if(this.greskeNaKraju)ispisnica.push(greskice[4]);
    ispisnica.push('"'+el.firstLokPovKatParcele+'"');
      if(this.greskeNaKraju)ispisnica.push(greskice[5]);
    ispisnica.push('"'+el.firstLokUlicaIBroj+'"');
      if(this.greskeNaKraju)ispisnica.push(greskice[6]);
    ispisnica.push('"'+el.firstPodnosiocAdresa+'"');
      if(this.greskeNaKraju)ispisnica.push(greskice[7]);
    ispisnica.push('"'+el.firstPodnosiocImePrez+'"');
      if(this.greskeNaKraju)ispisnica.push(greskice[8]);
    ispisnica.push('"'+el.firstPodnosiocJmbg+'"');
      if(this.greskeNaKraju)ispisnica.push(greskice[9]);
    ispisnica.push('"'+el.firstLayoutTime+'"');
  }
  dodajDrugi(ispisnica,el,greskice){
    ispisnica.push('"'+el.secondDostavaEmail+'"');
      if(this.greskeNaKraju)ispisnica.push(greskice[10]);
    ispisnica.push('"'+el.secondDostavaMobilni+'"');
      if(this.greskeNaKraju)ispisnica.push(greskice[11]);
    ispisnica.push('"'+el.secondLokBrKatParcele+'"');
      if(this.greskeNaKraju)ispisnica.push(greskice[12]);
    ispisnica.push('"'+el.secondLokBrObjekataNaParceli+'"');
      if(this.greskeNaKraju)ispisnica.push(greskice[13]);
    ispisnica.push('"'+el.secondLokMesto+'"');
      if(this.greskeNaKraju)ispisnica.push(greskice[14]);
    ispisnica.push('"'+el.secondLokPovKatParcele+'"');
      if(this.greskeNaKraju)ispisnica.push(greskice[15]);
    ispisnica.push('"'+el.secondLokUlicaIBroj+'"');
      if(this.greskeNaKraju)ispisnica.push(greskice[16]);
    ispisnica.push('"'+el.secondPodnosiocAdresa+'"');
      if(this.greskeNaKraju)ispisnica.push(greskice[17]);
    ispisnica.push('"'+el.secondPodnosiocImePrez+'"');
      if(this.greskeNaKraju)ispisnica.push(greskice[18]);
    ispisnica.push('"'+el.secondPodnosiocJmbg+'"');
      if(this.greskeNaKraju)ispisnica.push(greskice[19]);
    ispisnica.push('"'+el.secondLayoutTime+'"');

  }


  stringDistance(a, b){
    if(a.length == 0) return b.length;
    if(b.length == 0) return a.length;

    var matrix = [];

    // increment along the first column of each row
    var i;
    for(i = 0; i <= b.length; i++){
      matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for(j = 0; j <= a.length; j++){
      matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for(i = 1; i <= b.length; i++){
      for(j = 1; j <= a.length; j++){
        if(b.charAt(i-1) == a.charAt(j-1)){
          matrix[i][j] = matrix[i-1][j-1];
        } else {
          matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                  Math.min(matrix[i][j-1] + 1, // insertion
                                           matrix[i-1][j] + 1)); // deletion
        }
      }
    }

    return matrix[b.length][a.length];
  };
}
