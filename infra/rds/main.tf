module "security_group" {
  source = "terraform-aws-modules/security-group/aws"

  name = "${var.app}-${var.env}-db-sg"

  description = "PostgreSQL Security Group"

  vpc_id = var.vpc_id

  # ingress
  ingress_with_cidr_blocks = [
    {
      from_port   = 5432
      to_port     = 5432
      protocol    = "tcp"
      description = "PostgreSQL access from within VPC"
      cidr_blocks = var.vpc_cidr_block
    },
    {
      from_port   = 5432
      to_port     = 5432
      protocol    = "tcp"
      description = "PostgreSQL access from outside VPC"
      cidr_blocks = "0.0.0.0/0"
    },
  ]

  tags = {
    Name        = "${var.app}-${var.env}-db-sg"
    Environment = var.env
  }
}

module "db" {
  source = "terraform-aws-modules/rds/aws"

  identifier = "${var.app}-${var.env}-db"

  # create_db_instance        = false
  create_db_option_group    = false
  create_db_parameter_group = false
  create_random_password    = false
  
  engine                    = "postgres"
  engine_version            = "14.1"
  family                    = "postgres14"
  major_engine_version      = "14"

  instance_class = "db.t4g.micro"

  allocated_storage     = 20
  max_allocated_storage = 100

  db_name  = "${var.app}_${var.env}"
  username = var.db_user
  password = var.db_pass
  port     = 5432

  multi_az               = false
  db_subnet_group_name   = var.db_subnet_group_name
  vpc_security_group_ids = [module.security_group.security_group_id]

  skip_final_snapshot = true
  deletion_protection = false

  publicly_accessible = true

  tags = {
    Name        = "${var.app}-${var.env}-db"
    Environment = "${var.env}"
  }
}
