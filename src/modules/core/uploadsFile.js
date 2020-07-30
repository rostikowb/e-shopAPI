import fileUpload from "express-fileupload";

export default app=> {
    app.use(fileUpload());
}
