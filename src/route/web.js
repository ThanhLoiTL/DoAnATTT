import express from "express";
import userController from "../controllers/userController";
import jobController from "../controllers/jobController";
import partnerController from "../controllers/partnerController";
import contractController from "../controllers/contractController";
import positionController from "../controllers/positionController";
import projectController from "../controllers/projectController";
import reportController from "../controllers/reportController";

let router = express.Router();

let initWebRoutes = (app) => {

    //API User
    router.post('/api/login', userController.handleLogin);
    router.get('/api/getUserByRole', userController.getUserByRole);
    router.get('/api/getUserById', userController.getUserById);
    router.post('/api/postUser', userController.postUser);

    //API Job
    router.get('/api/getAllJobByRole', jobController.getAllJobByRole);
    router.get('/api/getJobByUser', jobController.getJobByUser);
    router.post('/api/postJob', jobController.postJob);
    router.put('/api/putJobStatus', jobController.updateStatusJob);

    //API Parner
    router.get('/api/getAllPartner', partnerController.getAllPartner);
    router.post('/api/postPartner', partnerController.postPartner);

    //API Contract
    router.get('/api/getAllContract', contractController.getAllContract);
    router.post('/api/postContract', contractController.postContract);

    //API Position
    router.get('/api/getAllPosition', positionController.getAllPosition);

    //API Project
    router.get('/api/getProjectByRole', projectController.getProjectByRole);
    router.get('/api/getProjectByUser', projectController.getProjectByUser);
    router.post('/api/postProjectByRole', projectController.postProjectByRole);

    //API Report
    router.post('/api/postReport', reportController.postReport);
    router.get('/api/getReportByRole', reportController.getReportByRole);

    return app.use("/", router);
}

module.exports = initWebRoutes;