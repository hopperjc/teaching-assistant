import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { Meta } from './meta'

@Injectable()
export class MetaService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  criar(meta: Meta): Observable<Meta> {
    return this.http.post<any>(this.taURL + "/metas", meta, {headers: this.headers})
      .pipe(
        retry(2),
        map( res => {if (res.success) {return meta;} else {return null;}} )
      )
  }

  atualizar(meta: Meta): Observable<Meta> {
    return this.http.put<any>(this.taURL + "/metas", JSON.stringify(meta), {headers: this.headers})
      .pipe(
        retry(2),
        map( res => {if (res.success) {return meta;} else {return null;}} )
      )    
  }

  remover(meta: Meta): Observable<Meta> {
    const url = this.taURL + `${this.taURL}/metas/${meta.nome}`
    return this.http.delete<any>(url, {headers: this.headers})
      .pipe(
        retry(2),
        map(res => {if (res.success) {return null;} else {return meta;}})
      )    
  
  }
  
  getMetas(): Observable<Meta[]> {
    return this.http.get<Meta[]>(this.taURL + "/metas")
      .pipe(
        retry(2)
      );  
  }

}