
// // Configure the Google OAuth strategy
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: process.env.GOOGLE_CALLBACK_URL,
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         let user = await User.findOne({ googleId: profile.id });

//         if (!user) {
//             user = new User({
//                 googleId: profile.id,
//                 email: profile.emails[0].value,
//                 userId: uuidv4(),
//                 username: profile.displayName,
//             });
//             await user.save();
//         }

//         return done(null, user);
//     } catch (err) {
//         return done(err, null);
//     }
// }));

// // Serialize user for the session
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// // Deserialize user from the session
// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         done(null, user);
//     } catch (err) {
//         done(err, null);
//     }
// });

// export default passport;

// // import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { User } from '../models/user.model.js'; // Adjust the path to your User model
// import { v4 as uuidv4 } from 'uuid';
// import config from './conf';

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/user.model.js'; 
import { v4 as uuidv4 } from 'uuid';
import config from './conf.js';

// Configure the Google OAuth strategy
// passport.use(new GoogleStrategy({
//     clientID: config.googleAuth.clientId,
//     clientSecret: config.googleAuth.clientSecret,
//     callbackURL: config.googleAuth.callbackUrl,
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         let user = await User.findOne({ googleId: profile.id });

//         if (!user) {
//             user = new User({
//                 googleId: profile.id,
//                 email: profile.emails[0].value,
//                 userId: uuidv4(),
//                 username: profile.displayName,
//             });
//             await user.save();
//         }

//         return done(null, user);
//     } catch (err) {
//         return done(err, null);
//     }
// }));

passport.use(new GoogleStrategy({
    clientID: config.googleAuth.clientId,
    clientSecret: config.googleAuth.clientSecret,
    callbackURL: config.googleAuth.callbackUrl,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id }); // Search by Google ID

        if (!user) {
            // If no user is found, create a new one
            user = new User({
                googleId: profile.id,  // Store the Google ID
                email: profile.emails[0].value,
                username: profile.displayName,
                fullname: profile.displayName,
                avatar: profile.photos ? profile.photos[0].value : '', // Use Google profile photo if available
            });
            await user.save(); // Save the user to the database
        }

        return done(null, user); // Pass the user to the next middleware (session)
    } catch (err) {
        return done(err, null); // Handle any errors
    }
}));





// Serialize user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

export default passport;
