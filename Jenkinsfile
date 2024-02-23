node {
        stage('Info') { 
                sh 'echo "Start Jenkins build for PTE WEB - env TEST"' 
        }
		
        stage('Build') {
                sh 'cd /home/ubuntu/git_project/benit-pte'
                sh 'git checkout -- .'
                sh 'git checkout develop'
                sh 'git pull https://nam17983:nam17983@bitbucket.org/benitprojects/benit-pte.git develop'
                sh 'cp -rf /home/ubuntu/config/pte-web-test/env.js /home/ubuntu/git_project/benit-pte/config'
                sh 'npm install' 
                sh 'npm run build' 
        }

        stage('Deploy') { 
                sh 'sudo rm -rf /home/ubuntu/www/test/*'
                sh 'cp -rf build/* /home/ubuntu/www/test' 
                sh 'echo "Deploy Completed !"' 
        }
}
