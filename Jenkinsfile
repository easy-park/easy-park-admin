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
        sh 'chmod -R 777 ./dist/'
        sh 'scp -i /root/ooclserver_rsa -r ./dist/ root@39.98.52.38:/usr/local/bin/admin/'
      }
    }
    stage('deploy') {
      steps {
        sh 'ssh -i /root/ooclserver_rsa root@39.98.52.38 "cp -rf /usr/local/bin/admin/dist/* /usr/share/nginx/html2/"'
      }
    }
  }
}