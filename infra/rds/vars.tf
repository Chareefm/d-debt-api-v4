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

variable "vpc_id" {
  type        = string
  description = "Vpc Id"
}

variable "vpc_cidr_block" {
  type        = string
  description = "Vpc Cidr Block"
}

variable "db_user" {
  type = string
}

variable "db_pass" {
  type = string
}

variable "db_subnet_group_name" {
  type = string
}

locals {
  zone_a = "${var.region}a"
  zone_b = "${var.region}b"
  zone_c = "${var.region}c"
}
