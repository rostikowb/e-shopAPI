import usersRouter from '../CMR/routes/usersRouters';
import goodsRouter from '../CMR/routes/goodsRouters';
import boughtRouter from "../CMR/routes/boughtRouters";
import ticketsRouter from "../CMR/routes/ticketRouters";
import imgRouter from "../CMR/routes/imgRouters";
import express from 'express';
import path from "path";
const root = path.join(path.dirname(require.main.filename), '/../static');

export default function routes(app) {
    app.use('/', goodsRouter);
    app.use('/users', usersRouter);
    app.use('/bought', boughtRouter);
    app.use('/ticket', ticketsRouter);
    app.use('/img', imgRouter);
    // app.use('/bought', checkAuth, boughtRouter);
    app.use('/static', express.static(root));
}