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
import { addUserData } from '@/firebase/collection/userCollection';
import { auth, googleProvider } from '@/firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function SignUp() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log(formData);
    setError(null);
    setIsSubmitting(true);

    const { email, password } = formData;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await addUserData({
        email,
        password,
      });
      console.log('User signed up:', userCredential.user);
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
      console.log('Google signed-in user:', user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='flex items-center justify-center w-full h-screen px-4'>
      <Card className='max-w-sm mx-auto'>
        <CardHeader>
          <CardTitle className='text-2xl'>Sign Up</CardTitle>
          <CardDescription>
            Enter your email below to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className='grid gap-4'>
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
            </div>
            <Button
              type='submit'
              className='w-full bg-extend-secondaryAzure'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </Button>
            <Button
              variant='outline'
              className='w-full'
              onClick={signInWithGoogle}
            >
              <i className='fa-brands fa-google'></i>Sign Up with Google
            </Button>
          </form>
          {error && <p className='mt-2 text-red-500'>{error}</p>}
          <div className='mt-4 text-sm text-center'>
            Already have an account?{' '}
            <Link to='/sign-in' className='underline'>
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
