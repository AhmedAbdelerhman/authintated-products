import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from './dto/create-user';
import { TypeOrmMethods_Create } from '@app/libs/typeorm/create.orm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEintity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JsonService } from '@app/redFromJSon.service';
import { ApiResponseMsg } from '@app/libs/errors/api-response-msg';
import { LogInDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { TypeOrmMethods_Find } from '@app/libs/typeorm/find.orm';
import { Request } from 'express';

const configService = new ConfigService()
interface JwtPayload {
    email: string;
    id: string
}

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEintity)
        private userRepository: Repository<UserEintity>,
        private jsonService: JsonService

    ) { }

    private readonly secretKey = process.env.secret_key

    async createToken(user: any, expiresIn: any = process.env.tokenSecondsDuration): Promise<string> {

        const payload: JwtPayload = { email: user.email, id: user.id };
        return jwt.sign(payload, this.secretKey, { expiresIn: expiresIn + "s" }); // Adjust token expiration as needed
    }


    async validateToken(token: string) {
        try {
            const decoded = await jwt.verify(token, this.secretKey) as JwtPayload;
            return decoded;
        } catch (error) {
            return null;
        }
    }




    async signUP(createUserDto: CreateUserDto) {

        const qBuilder = new TypeOrmMethods_Create(this.userRepository);

        const existEmail = await this.findOneByEmail(createUserDto['email']);
        if (existEmail) {
            return ApiResponseMsg.errorResponse("email already exist", 406)
        }
        try {

            // call create structure
            const newRecord = await qBuilder.addNew(createUserDto, CreateUserDto);

            const token = await this.createToken(newRecord, createUserDto.tokenSecondsDuration)
            // return success response
            return ApiResponseMsg.successResponse('created successfully', { user_id: newRecord['id'], token }, 201);
        } catch (error) {
            return error
        }


    }


    async login(loginUserDto: LogInDto) {

        const user = await this.findOneByEmail(loginUserDto['email']);
        if (!user) {
            return ApiResponseMsg.notFoundResponse()
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(loginUserDto.password, user.password);

        if (!passwordMatch) {
            return ApiResponseMsg.errorResponse("wrong email or password", 401)
        }

        const token = await this.createToken(loginUserDto, loginUserDto.tokenSecondsDuration)

        return ApiResponseMsg.successResponse('Login successful',
            {
                user_id: user['id'],
                expires_in: loginUserDto.tokenSecondsDuration + "s" || process.env.tokenSecondsDuration + "s",
                token
            }, 200);

    }





    async findOneByEmail(email: any) {
        const qBuilder = new TypeOrmMethods_Find(
            this.userRepository,
        );
        return qBuilder.FindOneBy({
            where: {
                email
            },

        }
        );
    }

    async WhoAmI(req: Request & { user: string }) {
        const user = await this.findOneByEmail(req.user['email']);
        const { password, updatedAt, ...userData } = user
        return ApiResponseMsg.successResponse('success', userData, 200);


    }


}
