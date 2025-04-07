import { FaFacebookF, FaGoogle, FaEye} from 'react-icons/fa';

const LoginForm = () =>
{
    return(
        <section className='login-form'>
            <form className='form'>
                <h1 className='form__header'>Log in</h1>
                
                <input className='form__field' type="email" placeholder="Email or username" />
                <div className='form__password-container'>
                    <input className='form__field' type="password" placeholder="Password" />
                    <FaEye />
                </div>

                <button id='login-btn' className='form__submit-btn'>Log in</button>
                <p className='form__error-status'></p>
            </form>

            <p className='form__divider'> OR </p>

            <div className="form__social-icons">
                <button className="form__icon">
                    <FaFacebookF />
                    FACEBOOK
                </button>

                <button className="form__icon">
                    <FaGoogle />
                    GOOGLE
                </button>
            </div>
            <p className='form__terms'> By signing in to our application, you agree to our Terms and Privacy Policy. </p>
        </section>
    );
};

export default LoginForm;