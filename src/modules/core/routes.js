import usersRouter from '../goods/usersRoutes';
import goodsRouter from '../goods/goodsRoutes';
// import express from 'express';
// import path from "path";
// const root = path.join(path.dirname(require.main.filename), '/../assets');

export default function routes(app) {
    app.use('/', goodsRouter);
    app.use('/users', usersRouter);
    // app.use('/assets', express.static(root));
}