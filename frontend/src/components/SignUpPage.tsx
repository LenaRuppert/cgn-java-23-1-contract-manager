import AuthForm from "./AuthForm";
import {useNavigate} from 'react-router-dom';

export default function SignUpPage() {

    const navigate = useNavigate();

    function handleSuccess() {
        navigate("/sign-in");
    }

    return (
        <AuthForm endpoint="/api/user" buttonText="registrieren" onSuccess={handleSuccess}/>
    )
}