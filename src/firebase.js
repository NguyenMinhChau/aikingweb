import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
	apiKey: 'AIzaSyBVXaR8HMqk8kDtZpY_3RteBt0pYbHv7Qs',
	authDomain: 'aiking-395d1.firebaseapp.com',
	projectId: 'aiking-395d1',
	storageBucket: 'aiking-395d1.appspot.com',
	messagingSenderId: '80460744198',
	appId: '1:80460744198:web:ac101625158754b83e6587',
	measurementId: 'G-PDDL6D0KFV',
});

const fb = firebase;

const db = fb.firestore();

const Comments = db.collection('comments');
const Likes = db.collection('likes');

export { Comments, Likes };

export default fb;
