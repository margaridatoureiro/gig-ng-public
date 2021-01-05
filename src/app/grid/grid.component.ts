import { Component, Input } from '@angular/core';
import { PaymentDataService } from "../payment.data.service";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})

export class GridComponent {

  @Input()
  date : Date = new Date();
  currentDate : string;

  codeCoordinates : number[];
  generatedCode = "?";

  letterInput = "";
  dynamicInput = false;

  isGridGeneratorDisabled : boolean = false;
  gridCount = 100;
  gridRecord = [];

  scopeIntervalID : any;

  constructor(private PaymentDataService: PaymentDataService) { 
   this.PaymentDataService.getCodeDetails().subscribe(codeInfo => {
      this.gridRecord = codeInfo.grid;
      this.generatedCode = codeInfo.code;
    });

    for(let i = 0; i < this.gridCount; i++) {
      this.gridRecord[i] = "";
    }

    this.isGridGeneratorDisabled = this.PaymentDataService.getGridState();
  }

  letterInputTimer() : any {
    this.dynamicInput = true;
    setTimeout(function () {
      this.dynamicInput = false;
    }.bind(this), 4000)
  }

  countLetters(occurrences : number) : number {
    if (occurrences > 9) { 
      let result : number;
      for(let i = 2; i < occurrences; i++) {
        result = occurrences / i;
        if (result <= 9) { break; }
      }
      return Math.round(result);
    } 
      return occurrences;
  }

  getCorrespondingLetters(first : any, second : any): String {
    const firstLetter = this.gridRecord[first];
    const secondLetter = this.gridRecord[second];
    const occurrencesFirstLetter = this.gridRecord.filter(el => el === firstLetter).length;
    const occurrencesSecondLetter = this.gridRecord.filter(el => el === secondLetter).length;
    let code = "";
    code += this.countLetters(occurrencesFirstLetter);
    code += this.countLetters(occurrencesSecondLetter);
    return code;
  }

  getPositions(): String {
    const firstPosition = [this.codeCoordinates[0], this.codeCoordinates[1]];
    const secondPosition = firstPosition.slice().reverse();
    const firstCoordinate = firstPosition[0] + firstPosition[1] * 10;
    const secondCoordinate = secondPosition[0] + secondPosition[1] * 10;
    return this.getCorrespondingLetters(firstCoordinate, secondCoordinate);
  }

  getCodeCordinates(num : number) : number[] {
    const formatedCode = num < 10 ? `0${num}` : `${num}`;
    return Array.from(formatedCode.split(''), Number);
}

  formatDate(): any {
    this.date = new Date();
    this.currentDate = this.date.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit', second: '2-digit'});
    this.codeCoordinates = this.getCodeCordinates(this.date.getSeconds());
    return this.getPositions();
  }

  generateRandomLetter(): any {
    let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    const grid = [];
    if(this.letterInput && (/[a-zA-Z]/).test(this.letterInput)){
      const replaceLetterCount = this.gridCount * 0.2;
      alphabet = alphabet.filter(letter => letter !== this.letterInput);

      for(let x = 0; x < replaceLetterCount; x++) {
        grid[x] = this.letterInput; 
      }

      for(let x = replaceLetterCount; x < this.gridCount; x++) {
        grid[x] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }

    } else {

      for(let x = 0; x < this.gridCount; x++) {
        grid[x] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
    const code = this.formatDate();
    this.PaymentDataService.saveCodeDetails({"code":  code, "grid" : grid });
  }


  startGridGenerator(): any {
    this.isGridGeneratorDisabled = true;
    this.PaymentDataService.saveGridState(this.isGridGeneratorDisabled);
    this.generateRandomLetter();
    this.scopeIntervalID = setInterval(this.generateRandomLetter.bind(this), 2000);
    let scopedIntervalId = this.scopeIntervalID;
    window.addEventListener("beforeunload", function () {
      clearInterval(scopedIntervalId);
    });
  }
}
