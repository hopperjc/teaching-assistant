export class Meta {
    nome: String

    constructor(){
        this.clean();
    }

    clean(): void {
        this.nome = "";
    }

    clone(): Meta {
        var meta = new Meta();
        meta.copyFrom(this);
        return meta;
    }

    copyFrom(from: Meta): void {
        this.nome = from.nome;
    }

    delete(metas: Meta[], meta: Meta): void {
        metas.splice(metas.indexOf(meta), 1)
    }
}