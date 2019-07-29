pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh 'npm install'
        sh 'npm run build'
      }
    }
    stage('test') {
      steps {
        sh 'systemctl stop nginx.service'
        sh 'rm  -rf /usr/share/nginx/html2/*'
        sh 'cp -rf ./dist/ /usr/share/nginx/html2/'
        sh 'chmod -R 777 /usr/share/nginx/html2/'
        sh 'systemctl start nginx.service'
      }
    }
  }
}