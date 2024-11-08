import {Controller, Post, Body, UnauthorizedException} from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async signup(@Body() body) {
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const user = await this.authService.prisma.user.create({
            data: {
                email: body.email,
                username: body.username,
                password: hashedPassword,
            },
        });
        return this.authService.login(user);
    }

    @Post('login')
    async login(@Body() body) {
        const user = await this.authService.validateUser(body.email, body.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const tokenResponse = await this.authService.login(user);
        return {
            message: `Bonjour ${user.username}, vous êtes bien connecté`,
            ...tokenResponse,
        };
    }
}
