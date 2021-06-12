import passport from 'passport';
import passportLocal from 'passport-local';
import { User, IUser } from '../models';

const LocalStrategy = passportLocal.Strategy;

interface IPassportConfig{
	init: () => void;
}

class PassportConfig implements IPassportConfig {
	public init(){
		// Serialize & Deserialize User
		passport.serializeUser((user: IUser, done) => {
			done(null, user.id);
		});
		passport.deserializeUser((id, done) => {
			User.findOne({ id }, (err, user) => {
				if (err) return done(err);
				done(null, user);
			});
		});



		// passport local strategy
		passport.use('local',
			new LocalStrategy({
				usernameField: 'id',
				passwordField: 'password'
			},
			(id, password, done) => {
				User.findOne({ id }, (err, user) => {
					if (err)
						return done(err);

					// id에 맞는 사용자가 없는 경우
					if (!user)
						return done(null, false, {message: 'Incorrect id.'});
					// password가 틀린 경우
					if (!user.validPassword(password))
						return done(null, false, {message: 'Incorrect password.'});

					// 로그인 성공
					return done(null, user);
				})
			})
		);
	}
}

const passportConfig = new PassportConfig();


export { passportConfig, IPassportConfig };