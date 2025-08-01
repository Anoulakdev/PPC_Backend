import { Controller, Post, Body } from '@nestjs/common';
// import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}

// @Controller('auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @Post('login')
//   async login(
//     @Body() loginDto: LoginDto,
//     @Res({ passthrough: true }) res: Response,
//   ) {
//     const { token, user } = await this.authService.login(loginDto);

//     // เซ็ต cookie
//     res.cookie('token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
//       maxAge: 60 * 60 * 1000, // 1 ชั่วโมง
//       path: '/',
//     });

//     return { token, user };
//   }

//   @Post('logout')
//   logout(@Res({ passthrough: true }) res: Response) {
//     res.clearCookie('token', {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
//     });
//     return { message: 'Logged out' };
//   }
// }
