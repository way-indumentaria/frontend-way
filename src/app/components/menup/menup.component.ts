import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from "../../services/autenticacion.service";

@Component({
  selector: 'app-menup',
  templateUrl: './menup.component.html',
  styleUrls: ['./menup.component.css']
})
export class MenupComponent implements OnInit {

  constructor(public autServ:AutenticacionService) {

   }

  ngOnInit(): void {
  }


}
