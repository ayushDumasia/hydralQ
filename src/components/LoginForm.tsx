import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth, googleProvider } from '@/firebase/firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';

export function LoginForm() {
  const [cookies, setCookie] = useCookies(['user']);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleLoginBtn = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const { email, password } = formData;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log('User signed in:', userCredential.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const signInWithGoogle = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log(user);
      console.log('Google signed-in user:', user);
      setCookie('user', user.uid, {
        path: '/',
        expires: new Date(Date.now() + 604800000),
      });
      console.log(cookies);
      navigate('/chat');
    } catch (err) {
      setError(err.message);
      console.error('Error during Google sign-in:', err);
    }
  };

  return (
    <Card className='max-w-sm mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLoginBtn} className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='john@example.com'
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='password'>Password</Label>
            </div>
            <Input
              id='password'
              type='password'
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <Link to='#' className='inline-block ml-auto text-sm underline'>
              Forgot your password?
            </Link>
          </div>
          <Button
            type='submit'
            className='w-full bg-extend-secondaryAzure'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>
          <Button
            variant='outline'
            className='w-full'
            onClick={signInWithGoogle}
          >
            <i className='fa-brands fa-google'></i>
            Login with Google
          </Button>
        </form>
        {error && <p className='mt-2 text-red-500'>{error}</p>}
        <div className='mt-4 text-sm text-center'>
          Don&apos;t have an account?{' '}
          <Link to='/sign-up' className='underline'>
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
