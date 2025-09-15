module.exports = app => {
    return class ProjectService {
        async getList() {
            return [
                {
                    id: 1,
                    name: 'Elpis',
                },
                {
                    id: 2,
                    name: 'Elpis',
                },
                {
                    id: 3,
                    name: 'Elpis',
                },
            ];
        }
    };
};
