const express = require('express');
const useRouter = require('./actions/actionsRouter');
const useRouterProjects = require('./projects/projectsRouter');
const server = express();

server.use(express.json());
server.use("/api/actions", useRouter);
server.use("/api/projects", useRouterProjects);

const port = 5000;
server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`)
});
