import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "./Firebase"


const resetPassword = (email: string): void => {

    sendPasswordResetEmail(auth, email).then( () => { console.log("Password reset, email sent")}).catch((error: Error) => {console.error(`Error: ${error.message}`)});

}

export default resetPassword;