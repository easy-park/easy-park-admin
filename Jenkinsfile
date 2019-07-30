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
    stage('deploy') {
      steps {
        sh 'scp -i /root/ooclserver_rsa -r /usr/share/nginx/html2/dist/ root@39.98.52.38:/usr/local/bin/admin/'
        sh 'ssh -i /root/ooclserver_rsa root@39.98.52.38 "cp -rf /usr/local/bin/admin/dist/* /usr/share/nginx/html2/"'
      }
    }
  }
}