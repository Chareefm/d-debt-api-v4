variable "region" {
  type        = string
  description = "AWS region"
  default     = "ap-southeast-1"
}

variable "access_key" {
  type        = string
  description = "Access Key Id"
}

variable "secret_key" {
  type        = string
  description = "Secret Access Key"
}

variable "app" {
  type        = string
  description = "Application name"
}

variable "env" {
  type        = string
  description = "Environment"
  default     = "dev"
}

locals {
  zone_a = "${var.region}a"
  zone_b = "${var.region}b"
  zone_c = "${var.region}c"
}
