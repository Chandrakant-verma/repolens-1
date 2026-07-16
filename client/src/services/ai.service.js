import api from "../api/axios";

const aiService = {

    askQuestion: async (repositoryId, question) => {

        const response = await api.post("/ai/ask", {
            repositoryId,
            question,
        });

        return response.data;
    },

};

export default aiService;