output "vpc_arn" {
  value = module.vpc.vpc_arn
}

output "private_subnet_arns" {
  value = module.vpc.private_subnet_arns
}

output "public_subnet_arns" {
  value = module.vpc.public_subnet_arns
}

output "private_subnet_ids" {
  value = module.vpc.private_subnets
}

output "public_subnet_ids" {
  value = module.vpc.public_subnets
}

output "default_security_group_id" {
  value = module.vpc.default_security_group_id
}

output "database_subnet_ids" {
  value = module.vpc.database_subnets
}

output "vpc_cidr_block" {
  value = module.vpc.vpc_cidr_block
}

output "db_subnet_group_name" {
  value = module.vpc.database_subnet_group_name
}
