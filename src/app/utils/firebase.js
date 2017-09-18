import firebase from 'firebase';
import { FIREBASE_CONFIG } from '../config';

export const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();
export const firebaseStorage = firebaseApp.storage();

const FireBaseTools = {

    /**
     * Return an instance of a firebase auth provider based on the provider string.
     *
     * @param provider
     * @returns {firebase.auth.AuthProvider}
     */
    getProvider: (provider) => {
        switch (provider) {
            case 'email':
                return new firebase.auth.EmailAuthProvider();
            case 'facebook':
                return new firebase.auth.FacebookAuthProvider();
            case 'github':
                return new firebase.auth.GithubAuthProvider();
            case 'google':
                return new firebase.auth.GoogleAuthProvider();
            case 'twitter':
                return new firebase.auth.TwitterAuthProvider();
            default:
                throw new Error('Provider is not supported!!!');
        }
    },

    /**
     * Login with provider => p is provider "email", "facebook", "github", "google", or "twitter"
     * Uses Popup therefore provider must be an OAuth provider. EmailAuthProvider will throw an error
     *
     * @returns {any|!firebase.Thenable.<*>|firebase.Thenable<any>}
     */
    loginWithProvider: (p) => {
        const provider = FireBaseTools.getProvider(p);
        return firebaseAuth.signInWithPopup(provider).then(firebaseAuth.currentUser).catch(error => ({
            errorCode: error.code,
            errorMessage: error.message,
        }));
    },

    /**
     * Register a user with email and password
     *
     * @param user
     * @returns {any|!firebase.Thenable.<*>|firebase.Thenable<any>}
     */
    registerUser: user => firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
        .then(userInfo => userInfo)
        .catch(error => ({
            errorCode: error.code,
            errorMessage: error.message,
        })),

    /**
     * Sign the user out
     *
     * @returns {!firebase.Promise.<*>|firebase.Thenable<any>|firebase.Promise<any>|!firebase.Thenable.<*>}
     */
    logoutUser: () => firebaseAuth.signOut().then(() => ({
        success: 1,
        message: 'logout',
    })),

    /**
     * Retrieve the current user (Promise)
     * @returns {Promise}
     */
    fetchUser: () => new Promise((resolve, reject) => {
        const unsub = firebaseAuth.onAuthStateChanged((user) => {
            unsub(); // why does it seem like this function unsub is calling itself here? recursion?
            resolve(user);
        }, (error) => {
            reject(error);
        });
    }),

    /**
     * Log the user in using email and password
     *
     * @param user
     * @returns {any|!firebase.Thenable.<*>|firebase.Thenable<any>}
     */
    loginUser: user => firebaseAuth.signInWithEmailAndPassword(user.email, user.password)
        .then(userInfo => {
            console.log('FIREBASE LOGIN: ', userInfo)
            return userInfo;
        })
        .catch(error => ({
            errorCode: error.code,
            errorMessage: error.message,
        })),

    /**
     * Update a user's profile data
     *
     * @param u
     * @returns {!firebase.Promise.<*>|firebase.Thenable<any>|firebase.Promise<any>|!firebase.Thenable.<*>}
     */
    updateUserProfile: u => firebaseAuth.currentUser.updateProfile(u).then(() => firebaseAuth.currentUser, error => ({
        errorCode: error.code,
        errorMessage: error.message,
    })),

    /**
     * Reset the password given the specified email
     *
     * @param email {string}
     * @returns {!firebase.Promise.<*>|firebase.Thenable<any>|firebase.Promise<any>|!firebase.Thenable.<*>}
     */
    resetPasswordEmail: email => firebaseAuth.sendPasswordResetEmail(email).then(() => ({
        message: 'Email sent',
    }), error => ({
        errorCode: error.code,
        errorMessage: error.message,
    })),

    /**
     * Update the user's password with the given password
     *
     * @param newPassword {string}
     * @returns {!firebase.Promise.<*>|firebase.Thenable<any>|firebase.Promise<any>|!firebase.Thenable.<*>}
     */
    changePassword: newPassword => firebaseAuth.currentUser.updatePassword(newPassword).then(user => user, error => ({
        errorCode: error.code,
        errorMessage: error.message,
    })),

    /**
     * Send an account email verification message for the currently logged in user
     *
     * @returns {!firebase.Promise.<*>|firebase.Thenable<any>|firebase.Promise<any>|!firebase.Thenable.<*>}
     */
    sendEmailVerification: () => firebaseAuth.currentUser.sendEmailVerification().then(() => ({
        message: 'Email sent',
    }), error => ({
        errorCode: error.code,
        errorMessage: error.message,
    })),

    /**
     * Get the firebase database reference.
     *
     * @param path {!string|string}
     * @returns {!firebase.database.Reference|firebase.database.Reference}
     */
    getDatabaseReference: path => firebaseDb.ref(path),

    /**
     * Get the firebase storage reference.
     *
     * @param path {!string|string}
     * @returns {!firebase.database.Reference|firebase.database.Reference}
     */
    getStorageReference: () => firebaseStorage.ref(),

    getRandomSwapiName: () => {
        let randomNameNum = Math.floor(Math.random() * (88 - 1 + 1)) + 1;
        return fetch(`https://swapi.co/api/people/${randomNameNum}`)
        .then(response => response.json())
        .then(data => {
            // console.log('SWAPI NAME:', data)
            return data;
        })
    },

    randomString: (length) => {
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    },

    addImageToStorage: (key, folderPath, imgUrl, uid) => {

        let prePath = 'snor/assets/';

        let folderImages = firebaseStorage.ref().child(prePath + folderPath);
        let newRoboFileName = `${key}.png`;
        let newRobo = folderImages.child(newRoboFileName);
        console.log('STORAGE:', newRobo.fullPath)

        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        var xhr = new XMLHttpRequest();
        xhr.open('GET', proxyurl + imgUrl, true);
        xhr.responseType = 'blob';
        xhr.onload = function (e) {
            if (this.status == 200) {
                var myBlob = this.response;
                console.log('what is myBlob', myBlob)
                newRobo.put(myBlob).then(snap => {
                    console.log('File Upload Complete: ', newRobo.fullPath);

                    FireBaseTools.getRandomSwapiName()
                    .then(data => {
                        // now update the avatar name and url in firebase
                        firebaseDb.ref(`users/${uid}/account/level`).update({
                            avatarUrl: snap.downloadURL,
                            avatarName: data.name
                        })
                    })
                })
            }
        };
        xhr.send();
    },
};

export default FireBaseTools;
