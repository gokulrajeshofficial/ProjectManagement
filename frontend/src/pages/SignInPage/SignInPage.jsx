
import { GoogleOAuthProvider} from '@react-oauth/google';
import SignInPageComponent from '../../components/SignInPageComponents/SignInPageComponent';
function SignInPage() {


  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLEAUTH_CLIENT_ID}>
      <SignInPageComponent/>
    </GoogleOAuthProvider>
  )
}

export default SignInPage