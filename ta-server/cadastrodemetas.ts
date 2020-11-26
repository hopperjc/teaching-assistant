import { Meta } from  './../ta-gui/src/app/metas/meta'

export class CadastroDeMetas {
    metas: Meta[] = [];
    
    cadastrar(meta: Meta): Meta {
      var result = null
      if(this.metaNãoCadastrada(meta.nome)){
        result = new Meta()
        result.copyFrom(meta)
        this.metas.push(result)
      }
      return meta;
    }

    metaNãoCadastrada(nome: String) {
      return !this.metas.find(m => m.nome == nome)
    }

    atualizar(meta: Meta): Meta {
      var result: Meta = this.metas.find(m => m.nome == meta.nome);
      if (result) result.copyFrom(meta)
      return result
    }

    remover(meta: Meta): void {
      var result: Meta = this.metas.find(m => m.nome == meta.nome)
      if (result) result.delete(this.metas, meta)
      return null;
    }

    getMetas(): Meta[] {
      return this.metas;
    }
} 