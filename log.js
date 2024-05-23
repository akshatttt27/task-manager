import React , {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {

  const [ user, setUser] = useState({
    email: '',
    password: '',
})

const handleChange = (e) => {
    const { name ,value } = e.target
    setUser({
        ...user,
        [name] : value
    })
    console.log(name, value);
    }

    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        {console.log("user",user )}

        <div className='card p-4 shadow-sm'>
        <h2 className='text-center mb-4'>Sign In</h2>
        <form action="/signin" method="post">
          <div className='mb-4'>
            <label for="email">email</label>
            <input type="text" id="email" name="email" className="form-control" value={user.email} onChange={ handleChange } required />
          </div>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" className="form-control" value={user.password} onChange={ handleChange } required />
            
            <button type="submit">Sign In</button>
        </form>
        <a href="#" className="link">Forgot password?</a>
        <a href="#" className="link">Create an account</a>
        </div>
      </div>
    );
  }

export default Login;