import { FaFacebookF, FaGoogle, FaEye} from 'react-icons/fa';

const SignupForm = () =>
{
    return(
        <section className='signup-form'>
            <form className='form'>
                <h1 className='form__header'>Sign up</h1>
                
                <div style={{display: 'flex', gap: 20}}>
                    <input className='form__field' type="text" placeholder="Name" />
                    <input className='form__field' type="text" placeholder="Username" />
                </div>
                
                <input className='form__field' type="email" placeholder="Email" />
                
                <div className='form__password-container'>
                    <input className='form__field' type="password" placeholder="Password" />
                    {/* <FaEye size="1.5rem"/> */}
                </div>

                <button id='submit-btn' className='form__submit-btn'>Sign up</button>
                <p className='form__error-status'></p>
            </form>

            <p className="form__divider">
                <span>OR</span>
            </p>

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

export default SignupForm;