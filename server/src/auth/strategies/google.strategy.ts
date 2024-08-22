import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "../auth.service";
import { Profile } from "passport";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService
    ) {
        super({
            clientID: configService.get<string>("GOOGLE_CLIENT_ID"),
            clientSecret: configService.get<string>("GOOGLE_CLIENT_SECRET"),
            callbackURL: configService.get<string>("GOOGLE_CALLBACK_URL"),
            scope: ["email", "profile"]
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
        const user = await this.authService.googleValidateUser(profile);

        done(null, user);
    }
}