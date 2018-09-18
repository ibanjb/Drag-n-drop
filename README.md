# React assignment

# Exercise

![Completed](https://img.shields.io/badge/Completed-99%25-orange.svg) 
![ES6](https://img.shields.io/badge/React-16.4.1-blue.svg) 
![eslint](https://img.shields.io/badge/eslint-air--bnb-%23ff69b4.svg) 
![Docker](https://img.shields.io/badge/Docker-Done-brightgreen.svg) 

![UnitTest](https://img.shields.io/badge/unit%20tests-jest-brightgreen.svg) 
![Coverage](https://img.shields.io/badge/test%20coverage-33%25-yellow.svg) 

![Flow](https://img.shields.io/badge/Flow-Done-brightgreen.svg) 
![FlowCoverage](https://img.shields.io/badge/flow--coverage-51%25-yellow.svg) 

### Requirements

Create a frontend React app to help with the hiring and onboarding of crew personnel as per the image below:

![Sketch of crew applications app](./docs/app-sketch.jpg "Sketch of crew applications app")

Prospective crew move through three stages:

- applied
- interviewing
- hired

Data sources:

- Crew personnel data: https://randomuser.me/api/?nat=gb&results=5

Try to progress as far as you can in 2 hours. Feel free to share your thoughts and ask questions throughout, good luck.

### Evaluation points

- correctness of implementation
- unit tests for business logic
- code best practices
- use of docker
- use of code quality enhancer such as linters and flow-type
- use of git, appropriate commit messages
- documentation: README and inline code comments

### Dockerize

If you want to test it in your local environment, follow the next steps in your favourite terminal:
- Build docker image:
   - docker build --rm -f "Dockerfile" -t dragndrop:latest .
- Run it:
   - docker run -it -p 80:5000 --rm dragndrop:latest
- Check it:
   - docker exec -it [container_id] /bin/bash

### Out of scope

- Add redux. Until we don't have an API available to reflect changes this modification will not be done

![Sample](sample.png)

### Code coverage status

![CodeCoverage](codecoverage.png)

### Flow coverage at 51% (threshold set to 80% -default-)

![FlowCoverage](flowcoverage.png)

Full report [here](./flow-coverage/index.html) (./flow-coverage/index.html)

