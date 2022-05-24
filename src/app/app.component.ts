import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dictionary';
  phraseForm: FormGroup;
  data;
  meanings;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.phraseForm = new FormGroup(
      {
        phrase: new FormControl('odd')
      }
    );
  }

  translatePhrase() {
    this.httpService.getTranslation(this.phraseForm.controls.phrase.value.trim()).subscribe(
      (data) => {
        console.log(this.data);
        this.data = data[0];
        this.meanings = this.unifyMeanings();
        console.log(this.meanings)
      },
      (err) => {
        console.log(err);
      }
    );

  }

  unifyMeanings() {
    let definitions = [];
    this.data.meanings.forEach(el => {
      el.definitions = el.definitions.map(def => ({
        ...def,
        partOfSpeech: el.partOfSpeech
      }));
      definitions = [...definitions, ...el.definitions];
    });
    return definitions;
  }


}
