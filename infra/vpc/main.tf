module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name                = "${var.app}-${var.env}-vpc"
  cidr                = "10.0.0.0/16"
  azs                 = ["${local.zone_a}", "${local.zone_b}", "${local.zone_c}"]
  private_subnets     = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets      = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
  database_subnets    = ["10.0.104.0/24", "10.0.105.0/24", "10.0.106.0/24"]
  redshift_subnets    = ["10.0.107.0/24", "10.0.108.0/24", "10.0.109.0/24"]
  elasticache_subnets = ["10.0.110.0/24", "10.0.111.0/24", "10.0.112.0/24"]

  # public access to RDS instances
  create_database_subnet_group           = true
  create_database_subnet_route_table     = true
  create_database_internet_gateway_route = true

  enable_dns_hostnames = true
  enable_dns_support   = true

  # Elasticache
  create_elasticache_subnet_group       = true
  create_elasticache_subnet_route_table = true

  tags = {
    "Environment" = "${var.env}"
  }

  # production setup
  # enable_nat_gateway = true
  # single_nat_gateway = true
  # one_nat_gateway_per_az = false
}

module "nat" {
  source = "int128/nat-instance/aws"
  name   = "${var.app}-${var.env}-nat"
  #   key_name                    = local.key_name
  vpc_id                      = module.vpc.vpc_id
  public_subnet               = module.vpc.public_subnets[0]
  private_subnets_cidr_blocks = module.vpc.private_subnets_cidr_blocks
  private_route_table_ids     = module.vpc.private_route_table_ids
  instance_types              = ["t3a.micro"]

  tags = {
    "Environment" = "${var.env}"
  }
}

resource "aws_eip" "nat" {
  network_interface = module.nat.eni_id
  tags = {
    Environment = "${var.env}"
  }
}

resource "aws_security_group_rule" "nat_ssh" {
  security_group_id = module.nat.sg_id
  type              = "ingress"
  cidr_blocks       = ["0.0.0.0/0"]
  from_port         = 22
  to_port           = 22
  protocol          = "tcp"
}

output "vpc_id" {
  value = module.vpc.vpc_id
}

output "nat_public_ip" {
  value = aws_eip.nat.public_ip
}
