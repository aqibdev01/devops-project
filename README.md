# Secure Cloud-Native CI/CD Platform
## BSE-8B Final Lab Project — DevOps for Cloud Computing

## Project Overview
A complete DevOps and DevSecOps implementation for deploying and managing a cloud-native 3-Tier Todo Application using modern tools and automation practices.

## Architecture
Developer → GitHub → GitHub Actions CI/CD → Docker Hub → Kubernetes (K3s on AWS EC2)
↓                                        ↓
Security Scans                    Prometheus + Grafana + Loki
(Trivy, SonarCloud, OWASP)              (Monitoring & Logging)

## Tech Stack
| Category | Tools |
|----------|-------|
| Application | React, Node.js/Express, MongoDB |
| Version Control | Git, GitHub |
| CI/CD | GitHub Actions |
| Containerization | Docker |
| Container Registry | Docker Hub |
| Orchestration | Kubernetes (K3s) |
| Infrastructure as Code | Terraform |
| Configuration Management | Ansible |
| Monitoring | Prometheus, Grafana |
| Logging | Loki, Promtail |
| Security | Trivy, SonarCloud, OWASP |
| Cloud | AWS (EC2, VPC, EKS) |

## Infrastructure
- **Cloud:** AWS ap-south-1 (Mumbai)
- **EC2:** m7i-flex.large, Ubuntu 22.04, 20GB gp3
- **Elastic IP:** 13.206.158.24
- **Kubernetes:** K3s v1.35.4

## CI/CD Pipeline Stages
1. Test Backend (Node.js unit tests)
2. Test Frontend (React unit tests)
3. SonarCloud Code Analysis
4. OWASP Dependency Check
5. Trivy Security Scan
6. Build & Push Docker Images
7. Deploy to Kubernetes

## Monitoring Stack
- **Prometheus** — metrics collection (port 32001)
- **Grafana** — dashboards (port 32000) — admin/admin123
- **Loki** — log aggregation
- **Promtail** — log collector

## Application Access
- **Todo App:** http://13.206.158.24
- **Grafana:** http://13.206.158.24:32000

## Project Structure
devops-project/
├── frontend/          # React frontend
├── backend/           # Node.js/Express API
├── docker/            # Dockerfiles + nginx config
├── kubernetes/        # K8s manifests
├── terraform/         # AWS infrastructure
├── ansible/           # Server configuration
├── monitoring/        # Monitoring configs
├── security/          # Security configs
└── .github/workflows/ # CI/CD pipeline

## Setup Instructions

### Prerequisites
- AWS Account
- GitHub Account
- Docker Hub Account
- Terraform installed
- Ansible installed

### Deploy Infrastructure
```bash
cd terraform
terraform init
terraform apply
```

### Configure Server
```bash
cd ansible
./generate-inventory.sh
ansible-playbook -i inventory.ini playbook.yml
```

### Deploy Application
```bash
ssh -i ~/.ssh/devops-key ubuntu@<EC2-IP>
kubectl apply -f https://raw.githubusercontent.com/aqibdev01/devops-project/main/kubernetes/secret.yml
kubectl apply -f https://raw.githubusercontent.com/aqibdev01/devops-project/main/kubernetes/mongodb.yml
kubectl apply -f https://raw.githubusercontent.com/aqibdev01/devops-project/main/kubernetes/backend.yml
kubectl apply -f https://raw.githubusercontent.com/aqibdev01/devops-project/main/kubernetes/frontend.yml
kubectl apply -f https://raw.githubusercontent.com/aqibdev01/devops-project/main/kubernetes/ingress.yml
kubectl apply -f https://raw.githubusercontent.com/aqibdev01/devops-project/main/kubernetes/hpa.yml
```

## Security Best Practices Implemented
- Kubernetes Secrets for sensitive data
- RBAC enabled (K3s default)
- No hardcoded passwords in code
- All Docker images scanned with Trivy
- Dependency vulnerabilities checked with OWASP
- Static code analysis with SonarCloud
- HTTPS ready (port 443 open)
- SSH key-based authentication only

## Student Information
- **Name:** Aqib Abdullah
- **Class:** BSE-8B
- **Subject:** DevOps for Cloud Computing
