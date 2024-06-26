import express from 'express';
import { SERVER_PORT } from '../global/enviroments';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/sokets'


export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT

        this.httpServer = new http.Server(this.app);
        this.io = new socketIO.Server(this.httpServer, {
			cors: {
				origin: true,
				credentials: true
			}
		})
            

        this.escucharSockets();
    }

    public static get instance() {
        return this._instance || (this._instance = new this())
    }
 
    private escucharSockets() {
        console.log('Escoltant la conexió')

        this.io.on('connection', cliente => {
            console.log(cliente.id)
            // Conectar cliente
            socket.conectarCliente( cliente, this.io);
           
            socket.configurarUsuario(cliente, this.io)

            socket.getUsers(cliente, this.io)

            socket.mensaje( cliente, this.io )

            socket.desconectar(cliente, this.io)
            
        })
            
    }

    start( callback: Function) {
        this.httpServer.listen( this.port, callback() )
    }
}