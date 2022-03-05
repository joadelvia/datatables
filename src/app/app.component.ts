import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Student } from './interface/student';
import { map } from 'rxjs/operators'
// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  students: Student[] = [];

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      responsive: true,
      language: {
        //Podemos utilizar el cdn o descargar el fichero y trabajar en local
        // url: 'http://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
        url: '/assets/es-ES.json'
      }
    };
    this.httpClient.get<Student[]>('http://localhost:3000/alumnos')
      .subscribe(data => {
        this.students = data;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next(null);
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
