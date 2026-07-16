import repositoryService from "./repository.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const cloneRepository = async (req, res, next) => {
    try {

        const { githubUrl } = req.body;

        const repository = await repositoryService.cloneRepository(
            githubUrl,
            req.user.id
        );

        return res.status(201).json(
            ApiResponse.success(
                "Repository cloned successfully.",
                repository
            )
        );

    } catch (error) {
        next(error);
    }
};

export const getRepositories = async (req, res, next) => {
    try {

        const repositories = await repositoryService.getRepositories(
            req.user.id
        );

        return res.status(200).json(
            ApiResponse.success(
                "Repositories fetched successfully.",
                repositories
            )
        );

    } catch (error) {
        next(error);
    }
};

export const getRepositoryById = async (req, res, next) => {

    try {

        const repository = await repositoryService.getRepositoryById(
            req.params.id
        );

        return res.status(200).json(
            ApiResponse.success(
                "Repository fetched successfully.",
                repository
            )
        );

    } catch (error) {

        next(error);

    }

};