import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class GetUserDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

}
