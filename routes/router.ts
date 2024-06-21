import { Router, Request, Response } from "express";
import Server from '../classes/server';

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
