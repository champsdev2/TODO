import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'

import User from '../helpers/UserHelper'
import bcrypthash from '../helpers/hashPassword';
import { config } from 'dotenv';
config();

passport.use(new GoogleStrategy({
        clientID: process.env.G_CLIENT_ID,
        clientSecret: process.env.G_SECRET,
        callbackURL: process.env.gcallbackURL
    },
    async (req, accessToken, refreshToken, profile, done) => {
        let myUser;
        let userF;
        myUser = await User.findOne({query: 'oauthID', data: profile.id});
        const emailUser = await User.findOne({query: 'email', data: profile.emails[0].value});
        if (err) {
            console.log(err); // handle errors!
        }
        if (emailUser && myUser === null) {
            const upUser = {
                oauthId: profile.id,
            }
            try {

                myUser = await User.update(upUser);
                userF = {
                    id: myUser.id,
                    email: myUser.email,
                    names: myUser.names,
                    avatar: myUser.avatar,
                    oauthID: myUser.oauId,
                    createdon: myUser.createdon,
                    modifiedon: myUser.modifiedon,
                }
                done(null, userF);
            } catch (error) {
                console.log(err);
            }
        }
        if (!err && myUser !== null) {
            userF = {
                id: myUser.id,
                email: myUser.email,
                names: myUser.names,
                avatar: myUser.avatar,
                oauthID: myUser.oauId,
                createdon: myUser.createdon,
                modifiedon: myUser.modifiedon,
            }
           done(null, userF);
        } else {
            const newNser = {
                names: profile.displayName,
                oauthID: profile.id,
                email: profile.emails[0].value,
                avatar: '/public/avatar/noprofile.png',
                password: bcrypthash.hashpassword("firstpassword"),
            }
            try {
                
                myUser = await User.create(newNser);
                userF = {
                    id: myUser.id,
                    email: myUser.email,
                    names: myUser.names,
                    avatar: myUser.avatar,
                    oauthID: myUser.oauId,
                    createdon: myUser.createdon,
                    modifiedon: myUser.modifiedon,
                }
                done(null, userF);
            } catch (error) {
                console.log(err);
            }
        }
    }
));

// used to serialize the user for the session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    const user = User.findOne({query: 'id', data: id});
    done(err, user);
});

export default passport;