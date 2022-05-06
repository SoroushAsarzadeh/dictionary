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

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
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
      },
      (err) => {
        console.log(err);
      }
    );

  }


}
