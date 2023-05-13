import { RecaptchaVerifier } from 'firebase/auth';
export {};

declare global {
	interface Window {
		recaptchaVerifier: RecaptchaVerifier;
	}
}
