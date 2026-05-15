#!/bin/bash
cd ~/devops-project/terraform
SERVER_IP=$(terraform output -raw elastic_ip)
cat > ~/devops-project/ansible/inventory.ini << EOL
[devops_servers]
${SERVER_IP} ansible_user=ubuntu ansible_ssh_private_key_file=~/.ssh/devops-key ansible_ssh_common_args='-o StrictHostKeyChecking=no'
EOL
echo "Inventory generated with IP: ${SERVER_IP}"
cat ~/devops-project/ansible/inventory.ini
