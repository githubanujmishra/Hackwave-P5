import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (


    <div className='relative'>
      <div  className="z-[100000] nav2  absolute  top-[0]  bg-cover bg-center bg-no-repeat w-full h-[100vh] flex items-center  justify-center ">
        <img className='absolute '  src="https://images.unsplash.com/photo-1530099486328-e021101a494a?q=80&w=1894&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      <div className="absolute border-2 rounded-2xl border-[#10439F]/30 top-[15vh] flex items-center bg-[#008DDA]/40 justify-center h-[83vh] w-[59%] backdrop-opacity-10 backdrop-invert">
      <div className="w-[60%] h-[90%] bg-gradient-to-r from-[#008DDA]   to-[#41C9E2] rounded-xl flex items-center justify-center flex-col ">
      <div className=" w-[60%] h-[75%] flex flex-col gap-4">
      <div className=" leading-[3.2rem]">
                 <h1 className="text-[3rem]">HELLO,</h1>
                 <h1 className="text-[3rem] font-bold">WELCOME !</h1>
              </div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
              className="text-white placeholder-white p-3 rounded-full border-[3px] bg-transparent "
              type="email"
              placeholder="Email ID"
              id='email'
              autocomplete="off"
          onChange={handleChange}
            />
        
        <input
              className="text-white placeholder-white p-3 rounded-full border-[3px] bg-transparent "
              type="password"
              placeholder="Password"
              id='password'
               onChange={handleChange}
            />

<button disabled={loading} className="bg-white p-3 text-black rounded-full font-semibold text-black uppercase hover:opacity-95 disabled:opacity-80" >{loading ? 'Loading...' : 'Sign In'}</button>

        
        <OAuth />
      </form>
      <div className='flex gap-2 items-center justify-center '>
        <p>Don't Have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>
      <p className='text-red-700 mt-5'>
        {error ? error.message || 'Something went wrong!' : ''}
      </p>
      





      </div>

  
      </div>
      
      </div>
      

      </div>
    
    </div>
    
  );
}
