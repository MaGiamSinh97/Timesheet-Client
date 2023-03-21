import PropTypes from 'prop-types';
import { useState } from "react";
import { variables } from '../common/variables';

async function loginUser(credentials) {
    return fetch(variables.API_URL + 'Employee/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(response => response.json())
   }

export default function Login({ setToken }) {
    const [FullName, setUserName] = useState();
    const [encPass, setPassword] = useState();
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            FullName,
            encPass
        });
        debugger
        setToken(token.data);
      }
  return (
    <section className="ftco-section" style={{marginTop:'30px'}}>
      <div className="container">
        <div className="row justify-content-center">
        </div>
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="login-wrap p-4 p-md-5">
              <div className="icon d-flex align-items-center justify-content-center">
                <span className="fa fa-user-o"></span>
              </div>
              <h3 className="text-center mb-4">Sign In</h3>
              <form action="#" className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control rounded-left"
                    placeholder="Username"
                    onChange={e => setUserName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group d-flex">
                  <input
                    type="password"
                    className="form-control rounded-left"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="form-control btn btn-primary rounded submit px-3"
                  >
                    Login
                  </button>
                </div>
                <div className="form-group d-md-flex">
                  <div className="w-50">
                  </div>
                  <div className="w-50 text-md-right">
                    <a href="#">Forgot Password</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
  };