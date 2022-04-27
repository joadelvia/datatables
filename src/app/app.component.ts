import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Student } from './interface/student';
import { map } from 'rxjs/operators'
import { DataTableDirective } from 'angular-datatables';
// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnDestroy, OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  students: Student[] = [];

  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.dtOptions = {
      order: [[1, 'asc']], //Nos permite indicar la ordenación, podemos poner tantos arrays de ordenación como queramos
                            // cada array recibe 2 parámetros, el 1° es la columna (empieza por 0), el segundo es asc o dsc
      pagingType: 'full_numbers',
      pageLength: 10,
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
        this.dtTrigger.next(this.dtOptions);
      });
  }

  changeList(){
    this.students = [
          {
              "id": 1,
              "nombre": "Domínguez Sánchez, Gema",
              "email": "dominguez@email.com",
              "nota": 7
          },
          {
              "id": 2,
              "nombre": "Pérez Gómez, Manuel",
              "email": "perez@email.com",
              "nota": 8
          },
          {
              "id": 3,
              "nombre": "López López, Sandra",
              "email": "lopez@email.com",
              "nota": 10
          },
          {
              "id": 4,
              "nombre": "Moreno Bonilla, Juan Manuel",
              "email": "bonilla@email.com",
              "nota": 4
          }
      ]
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next(null);
      });

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
