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
  audioUrl: string;
  emptyScreenMsgDefault: string = 'Let\'s search for something meaningful!';
  emptyScreenMsg: string;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.emptyScreenMsg = this.emptyScreenMsgDefault;
    this.phraseForm = new FormGroup(
      {
        phrase: new FormControl(null)
      }
    );
  }

  translatePhrase() {
    this.httpService.getTranslation(this.phraseForm.controls.phrase.value.trim()).subscribe(
      (data) => {
        console.log(data);
        this.audioUrl = this.extractAudioUrl(data[0]);
        this.data = data[0];
        this.meanings = this.unifyMeanings();
        console.log(this.meanings)
      },
      (err) => {
        console.log(err);
        this.data = null;
        this.meanings = null;
        this.emptyScreenMsg = err.error.title;
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

  extractAudioUrl(data): string {
    return data?.phonetics?.find(el => el.audio)?.audio || '';
  }

  playAudio() {
    const audio = new Audio();
    audio.src = this.audioUrl;
    audio.load();
    audio.play();
  }


}
