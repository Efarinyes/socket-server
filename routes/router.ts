

import { Router, Request, Response } from 'express';

const router = Router();

router.get('/mensajes', (req: Request, res: Response ) => {
    res.json({
        ok: true,
        mensaje: 'Tot correcte'
    });
});
router.post('/mensajes', ( req: Request, res: Response ) => {
    const cos = req.body.cos;
    const de = req.body.de;

    res.json({
        ok: true,
        mensaje: {
            cos,
            de
        }
    });
});
router.post('/mensajes/:id', ( req: Request, res: Response ) => {
    const cos = req.body.cos;
    const de = req.body.de;
    const id = req.params.id;

    res.json({
        ok: true,
        mensaje: {
            cos,
            de
            
        },
        id
    });
});



export default router;