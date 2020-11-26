import { Component, OnInit } from '@angular/core';
// Comentado pois não existe Aluno em common ainda
import { MetaService } from './metas.service';
import { Meta } from './meta'

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css']
})
export class MetasComponent implements OnInit {
  meta: Meta = new Meta
  metas: Meta[] = []
  metaduplicada: boolean = false;
  metaService: MetaService

  constructor() {}
  
  cadastrarMeta(meta: Meta): void {
    this.metaService.criar(meta.clone())
    .subscribe(
      mr => {
        if (mr) {
          this.metas.push(mr)
          this.meta = new Meta()
        } else {
          this.metaduplicada = true;
        }
      } ,
      msg => {alert(msg.message);}
      )
  }

  onMove(): void {
    this.metaduplicada = false;
  }

  ngOnInit() {
    this.metaService.getMetas()
      .subscribe(
        ms => {this.metas = ms;},
        msg => {alert(msg.message)}
      )            
  }

  removerMeta(meta: Meta): void {
    this.metaService.remover(meta.clone())
      .subscribe(
         mr => {
           mr.delete(this.metas, meta),
           msg => {alert(msg.message);}
         }
      )  
    
  }

}
