import { Component, OnInit } from '@angular/core';
// Comentado pois não existe Aluno em common ainda
import { MetaService } from './metas.service';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css']
})
export class MetasComponent implements OnInit {
  meta: String
  metas: String[] = []
  metaService: MetaService

  constructor() {}
  
  cadastrarMeta(meta: String): void {
    this.metaService.criar(meta)
    .subscribe(
      ar => {
        this.metas.push(ar);
      },
      msg => {alert(msg.message);}
      )
  }

  ngOnInit() {
    this.metaService.getMetas()
      .subscribe(
        as => {this.metas = as;},
        msg => {alert(msg.message)}
      )            
  }

  removerMeta(meta: String): void {
    this.metaService.remover(meta)
      .subscribe(
        ms => {
          this.metas.pop()
        }
      )  
    
  }

}
