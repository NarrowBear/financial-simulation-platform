import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class RegisterDto {
    @IsNotEmpty({ message: 'Phone cannot be empty' })
    @IsString({ message: 'Phone must be a string' })
    @IsPhoneNumber(undefined, { message: 'Invalid phone number' })
    phone: string;
    password: string;
    @IsNotEmpty({ message: 'Nick name cannot be empty' })
    @IsString({ message: 'Nick name must be a string' })
    nickName: string;
    avatar: string;
    idCard: string;
    @IsNotEmpty({ message: 'Email cannot be empty' })
    @IsString({ message: 'Email must be a string' })
    @IsEmail(undefined, { message: 'Invalid email' })
    email: string;
    realName: string;
}