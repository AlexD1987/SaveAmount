import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrl: './head.component.scss'
})
export class HeadComponent implements OnInit {


  async ngOnInit(): Promise<void> {
    await this.getCurrencys();
  }

  inrCurrency: { [key: string]: number }[] = [];
  phpCurrency: { [key: string]: number }[] = [];
  tryCurrency: { [key: string]: number }[] = [];
  copCurrency: { [key: string]: number }[] = [];
  php: number[] = [];
  try: number[] = [];
  cop: number[] = [];
  inr: number[] = [];

  saveValueSpotify: string[] = [];
  saveValueNetflix: string[] = [];
  saveValueParamount: string[] = [];
  saveValueDisney: string[] = [];
  saveValueApple: string[] = [];

  appleSavePercentage: number[] = [];
  disneySavePercentage: number[] = [];
  netflixSavePercentage: number[] = [];
  spotifySavePercentage: number[] = [];
  paramountSavePercentage: number[] = [];
  sumSavePercentage: number[] = [];


  spotifyValue = 149;
  netflixValue = 149.99;
  paramountValue = 13900;
  disneyValue = 64.99;
  appleValue = 99;

  spotifyRegular = 10.99;
  netflixRegular = 12.99;
  paramountRegular = 7.99;
  disneyRegular = 8.99;
  appleRegular = 9.99;

  setPhpValue = false;
  setTryValue = false;
  setCopValue = false;
  setInrValue = false;
  setSumSaving = false;


  async getCurrencys() {
    try {
      await this.getINRCurrency();
      await this.getPHPCurrency();
      await this.getTRYCurrency();
      await this.getCOPCurrency();
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
  }


  async getINRCurrency() {
    fetch('https://www.floatrates.com/daily/inr.json')
      .then(response => response.json())
      .then(data => {
        this.inrCurrency.push(data);
        const appleValue: any = this.inrCurrency[0]?.['eur'];
        this.inr.push(appleValue['rate']);
        this.calculateApple();
        this.setInrValue = true;
      })
      .catch(error => {
        console.error('Error fetching currency:', error);
      });
  }


  async getPHPCurrency() {
    fetch('https://www.floatrates.com/daily/php.json')
      .then(response => response.json())
      .then(data => {
        this.phpCurrency.push(data);
        const spotifyValue: any = this.phpCurrency[0]?.['eur'];
        this.php.push(spotifyValue['rate']);
        this.calculateSpotify();
        this.setPhpValue = true;
      })
      .catch(error => {
        console.error('Error fetching currency:', error);
      });
  }


  async getTRYCurrency() {
    fetch('https://www.floatrates.com/daily/try.json')
      .then(response => response.json())
      .then(data => {
        this.tryCurrency.push(data);
        const netflixValue: any = this.tryCurrency[0]?.['eur'];
        this.try.push(netflixValue['rate']);
        this.calculateDisney();
        this.calculateNetflix();
        this.setTryValue = true;
      })
      .catch(error => {
        console.error('Error fetching currency:', error);
      });
  }


  async getCOPCurrency() {
    fetch('https://www.floatrates.com/daily/cop.json')
      .then(response => response.json())
      .then(data => {
        this.copCurrency.push(data);
        const paramountValue: any = this.copCurrency[0]?.['eur'];
        this.cop.push(paramountValue['rate']);
        this.calculateParamount();
        this.setCopValue = true;
        this.calculateSumPercentage();
      })
      .catch(error => {
        console.error('Error fetching currency:', error);
      });
  }


  calculateSpotify() {
    const saving = (this.php[0] * this.spotifyValue).toFixed(2).replace(".", ",");
    this.saveValueSpotify.push(saving);
    this.calculateSpotifyPercentage();
  }


  calculateNetflix() {
    const saving = (this.try[0] * this.netflixValue).toFixed(2).replace(".", ",");
    this.saveValueNetflix.push(saving);
    this.calculateNetflixPercentage();
  }

  calculateParamount() {
    const saving = (this.cop[0] * this.paramountValue).toFixed(2).replace(".", ",");
    this.saveValueParamount.push(saving);
    this.calculateParamountPercentage();
  }


  calculateDisney() {
    const saving = (this.try[0] * this.disneyValue).toFixed(2).replace(".", ",");
    this.saveValueDisney.push(saving);
    this.calculateDisneyPercentage();
  }


  calculateApple() {
    const saving = (this.inr[0] * this.appleValue).toFixed(2).replace(".", ",");
    this.saveValueApple.push(saving);
    this.calculateApplePercentage();
  }


  calculateNetflixPercentage() {
    const discount = this.try[0] * this.netflixValue;
    const calculatedPrice = (100 / this.netflixRegular) * discount;
    this.netflixSavePercentage.push(Math.round(100 - calculatedPrice));
  }


  calculateSpotifyPercentage() {
    const discount = this.php[0] * this.spotifyValue;
    const calculatedPrice = (100 / this.spotifyRegular) * discount;
    this.spotifySavePercentage.push(Math.round(100 - calculatedPrice));
  }


  calculateDisneyPercentage() {
    const discount = this.try[0] * this.disneyValue;
    const calculatedPrice = (100 / this.disneyRegular) * discount;
    this.disneySavePercentage.push(Math.round(100 - calculatedPrice));
  }


  calculateParamountPercentage() {
    const discount = this.cop[0] * this.paramountValue;
    const calculatedPrice = (100 / this.paramountRegular) * discount;
    this.paramountSavePercentage.push(Math.round(100 - calculatedPrice));
  }


  calculateApplePercentage() {
    const discount = this.inr[0] * this.appleValue;
    const calculatedPrice = (100 / this.appleRegular) * discount;
    this.appleSavePercentage.push(Math.round(100 - calculatedPrice));
  }


  async calculateSumPercentage() {
    try {
      let sumDiscount = await this.getDiscount();
      let sumRegular = await this.getRegular();

      let calculatedSaving = (100 / sumRegular) * sumDiscount;

      this.sumSavePercentage.push(Math.round(100 - calculatedSaving));
      console.log(this.sumSavePercentage);

      setTimeout(() => {
        this.setSumSaving = true;
      }, 500);
    } catch (error) {
      console.error('Error in calculateSumPercentage:', error);
    }
  }


  getDiscount(): Promise<number> {
    return new Promise((resolve, reject) => {
      try {
        let sumDiscount = (this.inr[0] * this.appleValue) + (this.cop[0] * this.paramountValue) + (this.try[0] * this.disneyValue) + (this.php[0] * this.spotifyValue) + (this.try[0] * this.netflixValue);
        resolve(sumDiscount);
      } catch (error) {
        reject(error);
      }
    });
  }


  getRegular(): Promise<number> {
    return new Promise((resolve, reject) => {
      try {
        let sumRegular = this.spotifyRegular + this.netflixRegular + this.appleRegular + this.paramountRegular + this.disneyRegular;
        resolve(sumRegular);
      } catch (error) {
        reject(error);
      }
    });
  }

}
