import { IsString } from 'class-validator';

export class CreateExampleDto {
  @IsString()
  public username: string;
}
