output "server_public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.devops_server.public_ip
}

output "server_public_dns" {
  description = "Public DNS of the EC2 instance"
  value       = aws_instance.devops_server.public_dns
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "ami_used" {
  description = "AMI ID used for the instance"
  value       = data.aws_ami.ubuntu.id
}

output "ssh_command" {
  description = "SSH command to connect to the server"
  value       = "ssh -i ~/.ssh/devops-key ubuntu@${aws_instance.devops_server.public_ip}"
}
