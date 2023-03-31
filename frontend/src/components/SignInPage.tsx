import AuthForm from "./AuthForm";
import {useNavigate} from 'react-router-dom';

type SignInPageProps = {
    getAllClients: () => void
    getAllJobs: () => void
}

export default function SignInPage(props: SignInPageProps) {

    const navigate = useNavigate();

    function handleSuccess() {
        navigate(window.sessionStorage.getItem('signInRedirect') || '/')
        props.getAllClients()
        props.getAllJobs()
    }

    return (
        <AuthForm endpoint="/api/user/login" buttonText="login" onSuccess={handleSuccess}/>
    );
}