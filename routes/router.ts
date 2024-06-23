import { Router, Request, Response, response } from "express";
import Server from '../classes/server';

import { usuariosConectados } from '../sockets/sokets';

export const router = Router();

router.get("/mensajes", (req: Request, resp: Response) => {
  resp.json({
    ok: true,
    mensaje: "Tot correcte [get]",
  });
});

router.post("/mensajes", (req: Request, resp: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;

  const payload = {
    de,
    cuerpo
  }

  const server = Server.instance;
  server.io.emit('missatge-nou', payload )

  resp.json({
    ok: true,
    cuerpo,
    de,
  });
});

router.post("/mensajes/:id", (req: Request, resp: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  const id = req.params.id;

  const payload = {
    de,
    cuerpo,
  };

  const server = Server.instance;

  server.io.in(id).emit("mensaje-privado", payload);

  resp.json({
    ok: true,
    cuerpo,
    de,
    id,
  });
});

// Obtenir els ID de tots els usuaris conectats al servidor

router.get('/usuarios', (req: Request, resp: Response) => {

  const server = Server.instance;

  server.io.fetchSockets().then((sockets) => {
    const  clients: Object[] = []
    sockets.forEach( socket => clients.push(socket.id))
    resp.json({
      ok: true,
      clients
    })
  }).catch(error => {
    resp.json({
      ok: false,
      error
    })
  });

});

router.get('/usuarios/detalls', (req: Request, resp: Response) => {
  const clients: Object[] = []
  resp.json({
    ok: true,
    clients: usuariosConectados.getLista()
  })
  

})
