pipeline {
    agent any

    environment {
        GITHUB_STATUS_ACCESS_TOKEN_SEBAMOMANN = credentials('GITHUB_STATUS_ACCESS_TOKEN_SEBAMOMANN')
    }

    options {
        ansiColor('xterm')
    }

    stages {
        stage('Build Docker image') {
            steps {
                script {
                    try {
                        sh 'docker-compose -f docker-compose-deploy.yaml -p "dhbw_loadbalancer" up --build -d --compatibility'
                    } catch (err) {
                        error("Docker compose command failed")
                    }
                }
            }
        }
    }
    post {
        always {
            script {
                try {
                    sh 'docker image rm dhbw_lb_service1 dhbw_lb_service2 dhbw_lb_service3 dhbw_lb_balancer dhbw_lb_client'
                } catch (err) {
                    echo err.getMessage()
                }
            }
        }
        success {
            script {
                updateStatus("success")
            }
        }
        failure {
            script {
                updateStatus("failure")
            }
        }
        aborted {
            script {
                updateStatus("error")
            }
        }
    }
}

void updateStatus(String value) {
    sh 'curl -s "https://api.github.com/repos/sebamomann/dhbw_verteilte_systeme_loadbalancer/statuses/$GIT_COMMIT" \\\n' +
            '  -H "Content-Type: application/json" \\\n' +
            '  -H "Authorization: token $GITHUB_STATUS_ACCESS_TOKEN_SEBAMOMANN" \\\n' +
            '  -X POST \\\n' +
            '  -d "{\\"state\\": \\"' + value + '\\", \\"description\\": \\"Jenkins\\", \\"context\\": \\"continuous-integration/jenkins\\", \\"target_url\\": \\"https://jenkins.dankoe.de/job/sebamomann_dhbw_loadbalancer/job/$BRANCH_NAME/$BUILD_NUMBER/console\\"}" \\\n' +
            '  '
}
