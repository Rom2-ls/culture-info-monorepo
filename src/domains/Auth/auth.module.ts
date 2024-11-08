import {Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import * as process from "node:process";
import {AuthController} from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from 'prisma/prisma.service';
import {JwtStrategy} from "./jwt.strategy";

@Module({
    imports:[
        PassportModule,
        JwtModule.register({
        secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '1h'},
        }),
    ],
    providers:[AuthService,PrismaService,JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}