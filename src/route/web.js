import express from "express";
import userController from "../controllers/userController";
import jobController from "../controllers/jobController";
import partnerController from "../controllers/partnerController";
import contractController from "../controllers/contractController";
import positionController from "../controllers/positionController";
import projectController from "../controllers/projectController";
import reportController from "../controllers/reportController";
import authentication from "../authentication/authenticationToken";

let router = express.Router();

let initWebRoutes = (app) => {

    //API User
    router.post('/api/login', userController.handleLogin);
    router.get('/api/getUserByRole', authentication, userController.getUserByRole);
    router.get('/api/getUser', authentication, userController.getUser);
    router.get('/api/getUserById', userController.getUserById);
    router.post('/api/postUser', authentication, userController.postUser);
    router.get('/api/checkRoleOfUser', authentication, userController.checkRoleOfUser);
    router.put('api/putUser', authentication, userController.updateUser);
    router.delete('/api/deleteUser', authentication, userController.deleteUser);

    //API Job
    router.get('/api/getAllJobByRole', authentication, jobController.getAllJobByRole);
    router.get('/api/getJobByUser', authentication, jobController.getJobByUser);
    router.post('/api/postJob', jobController.postJob);
    router.put('/api/putJobStatus', authentication, jobController.updateStatusJob);
    router.put('/api/putJob', authentication, jobController.updateJob);
    router.delete('/api/deleteJob', authentication, jobController.deleteJob);

    //API Partner
    router.get('/api/getAllPartner', authentication, partnerController.getAllPartner);
    router.post('/api/postPartner', partnerController.postPartner);
    router.put('/api/putPartner', authentication, partnerController.updatePartner);
    router.delete('/api/deletePartner', authentication, partnerController.deletePartner);

    //API Contract
    router.get('/api/getAllContract', authentication, contractController.getAllContract);
    router.post('/api/postContract', contractController.postContract);
    router.put('/api/putContract', authentication, contractController.updateContract);
    router.delete('/api/deleteContract', authentication, contractController.deleteContract);

    //API Position
    router.get('/api/getAllPosition', positionController.getAllPosition);

    //API Project
    router.get('/api/getProjectByRole', authentication, projectController.getProjectByRole);
    //router.get('/api/getProjectByUser', projectController.getProjectByUser);
    router.post('/api/postProjectByRole', projectController.postProjectByRole);
    router.put('/api/putProject', authentication, projectController.updateProject);
    router.delete('/api/deleteProject', authentication, projectController.deleteProject);

    //API Report
    router.post('/api/postReport', reportController.postReport);
    router.get('/api/getReportByRole', authentication, reportController.getReportByRole);
    router.delete('/api/deleteReport', authentication, reportController.deleteReport);

    return app.use("/", router);
}

module.exports = initWebRoutes;