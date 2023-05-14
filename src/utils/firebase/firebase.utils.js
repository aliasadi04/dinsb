import { initializeApp } from "firebase/app";
import {
	getAuth,
	RecaptchaVerifier,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	signInWithPhoneNumber,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
	onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyBQ37oAQneDFd0f7D35oZHmsC3uAFoeNe0",
	authDomain: "dinsb-28e44.firebaseapp.com",
	projectId: "dinsb-28e44",
	storageBucket: "dinsb-28e44.appspot.com",
	messagingSenderId: "284235692585",
	appId: "1:284235692585:web:8d544982406e94d148fa38",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();

export const PhoneNumberSignIn = async (phoneNumber, appVerifier) => {
	return await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
};

export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addSingleDocument = async (collectionKey, object) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	const docRef = doc(collectionRef, object.id.toString());
	//set the batch (transaction)
	batch.set(docRef, object);
	await batch.commit();
};

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	//attach to batch (transaction)
	objectsToAdd.forEach((object) => {
		//set reference
		const docRef = doc(collectionRef, object.id.toString());
		//set the batch (transaction)
		batch.set(docRef, object);
	});
	await batch.commit();
};
export const getChats = async () => {
	const collectionRef = collection(db, "chats");
	const q = query(collectionRef);
	const querySnapshot = await getDocs(q);

	const chats = querySnapshot.docs.reduce((acc, docSnapshot) => {
		acc.push(docSnapshot.data());

		return acc;
	}, []);

	return chats;
};

export const getUsers = async () => {
	const collectionRef = collection(db, "users");
	const q = query(collectionRef);
	const querySnapshot = await getDocs(q);

	const users = querySnapshot.docs.reduce((acc, docSnapshot) => {
		acc.push(docSnapshot.data());

		return acc;
	}, []);

	return users;
};

export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(db, "categories");
	const q = query(collectionRef);

	//wtf
	const querySnapshot = await getDocs(q);

	const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
		const { title, items } = docSnapshot.data();
		acc[title.toLowerCase()] = items;
		return acc;
	}, {});
	return categoryMap;
};

export const getUserByUid = async (uid) => {
	const collectionRef = collection(db, "users");
	const q = query(collectionRef);
	const querySnapshot = await getDocs(q);

	const foundUser = querySnapshot.docs.filter((user) => {
		return user.id === uid;
	});

	const moddedUser = foundUser[0].data();

	return moddedUser;
};

export const createSimpleUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return;

	const userDocRef = doc(db, "users", userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { phoneNumber } = userAuth;

		const createdAt = new Date().valueOf();

		try {
			await setDoc(userDocRef, {
				phoneNumber,
				createdAt,

				...additionalInformation,
			});
		} catch (error) {
			console.log("error creating the user", error.message);
		}
	}

	return userDocRef;
};
export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = {}
) => {
	if (!userAuth) return;

	const userDocRef = doc(db, "users", userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,

				...additionalInformation,
			});
		} catch (error) {
			console.log("error creating the user", error.message);
		}
	}

	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};

const q = query(collection(db, "chats"));
const u = query(collection(db, "homeworks"));
export const dataChangeListener = (callback) => {
	onSnapshot(q, callback);
};
export const homeworkChangeListener = (callback) => {
	onSnapshot(u, callback);
};
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);

const storage = getStorage(firebaseApp);

export const uploadImageToStorage = async (image, filePath) => {
	if (image == null) {
		console.log("no image");
		return;
	}
	const imageRef = ref(storage, `images/${filePath}`);
	await uploadBytes(imageRef, image);
	// ${image.name+v4()}
	return getDownloadURL(imageRef);
};
export const formatErrorMessage = (error) =>
	error.message
		.substring(error.message.indexOf("(") + 1, error.message.lastIndexOf(")"))
		.replace("-", " ")
		.replace("auth", "")
		.replace("/", "");
