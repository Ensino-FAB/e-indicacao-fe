import {Injectable, Injector} from '@angular/core';
import {CategoriaService} from '../../../services/categoria.service';
import {CategoriaSearchModel} from '../../../models/categoria-search.model';
import {Observable} from 'rxjs';
import {Pageable} from '../../../core/models/pageable.model';
import {Categoria} from '../../../models/categoria.model';


@Injectable()
export class EventoFacade {
  // tslint:disable-next-line:variable-name
  private _categoriaService: CategoriaService;

  constructor(private injector: Injector) {
  }

  private get service(): CategoriaService {
    if (!this._categoriaService) {
      this._categoriaService = this.injector.get(CategoriaService);
    }
    return this._categoriaService;
  }

  public getAllCategoria(
    search: CategoriaSearchModel
  ): Observable<Pageable<Categoria>> {
    return this.service.findAll(search);
  }

  public delete(id: number): Observable<any> {
    return this.service.remove(id);
  }

  public save(record: Categoria): any {
    return this.service.save(record);
  }

  public findOrganizacao(id: number): Observable<Categoria> {
    return this.service.findById(id);
  }
}
