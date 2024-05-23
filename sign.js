import React ,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Signin = () => {

    const [ user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        repass : ''
    })

    const handleChange = (e) => {
        const { name ,value } = e.target
        setUser({
            ...user,
            [name] : value
        })
        console.log(name, value);
        }

    const register = () => {
        const { name, email, password ,repass} = user;
        if (name && email && password && (password === repass)) {
            axios.post('http://localhost:9002/Signin', {
            name,
            email,
            password
        }).then(res => console.log(name, res));
        }
        else {
            alert("please fill all the fields")
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            {console.log("user",user )}
            <div className="card p-4 shadow-sm" style={{ width: '300px' }}>
                <h2 className="text-center mb-4">Signin</h2>
                <form action="/Signin" method="post">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" id="username" name="name" className="form-control" value={user.name} placeholder='name' onChange={ handleChange } required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" id="email" name="email" className="form-control" value={user.email} onChange={ handleChange } required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" name="password" className="form-control" value={user.password} onChange={ handleChange } required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="repassword" className="form-label">Re enter Your Password</label>
                        <input type="repassword" id="repassword" name="repass" className="form-control" value={user.repass} onChange={ handleChange } required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" onClick={register}>Signin</button>
                </form>
                <div className="mt-3 text-center">
                    <a href="#" className="d-block">Already have an account? Sign In</a>
                </div>
            </div>
        </div>
    );
}

export default Signin;