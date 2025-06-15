group "default" {
  targets = ["frontend", "backend", "worker"]
}

target "frontend" {
  context = "frontend"
  dockerfile = "./Dockerfile"
  tags = ["logenz/frontend:latest"]
}

target "backend" {
  context = "backend"
  dockerfile = "./Dockerfile"
  tags = ["logenz/backend:latest"]
}

target "worker" {
  context = "worker"
  dockerfile = "./Dockerfile"
  tags = ["logenz/worker:latest"]
}
