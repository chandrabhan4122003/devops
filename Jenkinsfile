// pipeline {
//     agent any
    
//     tools {
//         nodejs 'NodeJS'
//     }

//     environment {
//         DOCKER_CREDENTIALS = credentials('docker-hub')
//     }

//     stages {
//         stage('Checkout') {
//             steps {
//                 checkout scm
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 bat 'cd backend && npm install'
//                 bat 'cd frontend && npm install'
//             }
//         }

//         stage('Build Frontend') {
//             steps {
//                 bat 'cd frontend && npm run build'
//             }
//         }

//         stage('Docker Build') {
//             steps {
//                 bat 'docker build -t chandrabhan4122003/pms-backend:latest ./backend'
//                 bat 'docker build -t chandrabhan4122003/pms-frontend:latest ./frontend'
//             }
//         }

//         stage('Docker Push') {
//             steps {
//                 withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
//                     bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
//                     bat 'docker push chandrabhan4122003/pms-backend:latest'
//                     bat 'docker push chandrabhan4122003/pms-frontend:latest'
//                 }
//             }
//         }

//         stage('Deploy') {
//             steps {
//                 bat 'docker-compose up -d'
//             }
//         }

//         stage('Health Check') {
//             steps {
//                 bat 'timeout /t 30'
//                 bat 'docker ps'
//             }
//         }
//     }

//     post {
//         always {
//             bat 'docker logout'
//         }
//     }
// }
pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        DOCKER_CREDENTIALS = credentials('docker-hub')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'cd backend && npm install'
                sh 'cd frontend && npm install'
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'cd frontend && npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t chandrabhan4122003/pms-backend:latest ./backend'
                sh 'docker build -t chandrabhan4122003/pms-frontend:latest ./frontend'
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    sh 'docker push chandrabhan4122003/pms-backend:latest'
                    sh 'docker push chandrabhan4122003/pms-frontend:latest'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose up -d'
            }
        }

        stage('Health Check') {
            steps {
                sh 'sleep 30'
                sh 'docker ps'
            }
        }
    }

    post {
        always {
            sh 'docker logout'
        }
    }
}
