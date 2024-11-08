import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {PrismaService} from "../../../prisma/prisma.service";
import * as bcrypt from 'bcryptjs';

@Injectable()

export class AuthService {

    constructor(public jwtService: JwtService, public prisma: PrismaService) {}

    async validateUser(email: string, password: string):Promise<any> {
        const user= await this.prisma.user.findUnique({where:{email}});
        if(user && await bcrypt.compare(password, user.password)) {
            const {password, ...result}=user;
            return result;
        }
        return null;
    }

    async login(user: any){
        const payload = {
            username: user.username, sub:user.id
        };
        return{
            access_token: this.jwtService.sign(payload)
        }
    }


}