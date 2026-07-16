import api from "../api/axios";

const repositoryService = {

    cloneRepository: async (githubUrl) => {

        const response = await api.post(
            "/repositories/clone",
            { githubUrl }
        );

        return response.data;
    },

    getRepositories: async () => {

        const response = await api.get(
            "/repositories"
        );

        return response.data;
    },

};

export default repositoryService;