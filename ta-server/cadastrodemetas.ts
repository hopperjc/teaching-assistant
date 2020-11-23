export class CadastroDeMetas {
    metas: String[] = [];
    
    cadastrar(meta: String): String {
      meta = new String()
      this.metas.push(meta)
      return meta;
    }

    remover(): void {
      this.metas.pop()
      return null;
    }

    getMetas(): String[] {
      return this.metas;
    }
} 