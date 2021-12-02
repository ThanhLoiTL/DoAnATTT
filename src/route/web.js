import express from "express";
import userController from "../controllers/userController";
import jobController from "../controllers/jobController";
import partnerController from "../controllers/partnerController";
import contractController from "../controllers/contractController";

let router = express.Router();

let initWebRoutes = (app) => {

    //API User
    router.post('/api/login', userController.handleLogin);
    router.get('/api/getUserByRole', userController.getUserByRole);
    router.get('/api/getUserById', userController.getUserById);

    //API Job
    router.get('/api/getAllJobByRole', jobController.getAllJobByRole);
    router.get('/api/getJobByUser', jobController.getJobByUser);

    //API Parner
    router.get('/api/getAllPartner', partnerController.getAllPartner);

    //API Contract
    router.get('/api/getAllContract', contractController.getAllContract);

    return app.use("/", router);
}

module.exports = initWebRoutes;