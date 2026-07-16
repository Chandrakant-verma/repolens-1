import aiService from "./ai.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const askQuestion = async (req, res, next) => {
    try {

        const { repositoryId, question } = req.body;

        console.log("Repository ID:", repositoryId);

        const answer = await aiService.askQuestion(
            repositoryId,
            question
        );

        return res.status(200).json(
            ApiResponse.success(
                "Answer generated successfully.",
                {
                    answer,
                }
            )
        );

    } catch (error) {

        next(error);

    }
};