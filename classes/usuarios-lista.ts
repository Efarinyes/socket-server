import { Usuario } from "./usuario";

export class UsuariosLista {

    private lista: Usuario[] = [];

    constructor() {}

    public agregar( usuario: Usuario) {

        this.lista.push( usuario );
        console.log(this.lista);
        return usuario;
    }

    // Actualitzem nom usuari
    public actualizarNombre( id: string, nombre: string ) {
        for (let usuario of this.lista ) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            };
        }
        console.log('Actualitzando Usuario...');
        console.log(this.lista);
    }
    // Retornem tots els usuaris
    public getLista() {
        return this.lista.filter( usuario => usuario.nombre !== 'Jon-Doe')
    }

    // Retornem un usuari pel seu id
    public getUsuario( id: string) {
        return this.lista.find( usuario => usuario.id === id)
    }

    // Retornem tots els usuaris d'una sala concreta
    public getUsuariosSala( sala: string) {

        return this.lista.filter( usuario => usuario.sala === sala)
    }

    // Borrar usuario inactiu

    public borrarUsuario(id: string) {
        
        const tempUsuari = this.getUsuario(id);
        this.lista = this.lista.filter( usuario => usuario.id !== id )
        
        return tempUsuari;
    }
}