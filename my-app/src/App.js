import logo from "./logo.svg";
import "./App.css";
import { useRef } from "react";
import { toast } from "react-toastify";

function App() {
  const usernameInput = useRef();
  const dobInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();

  const postData = async (e) => {
    e.preventDefault();

    const data = {
      username: usernameInput.current.value,
      dob: dobInput.current.value,
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };
    console.log(data);

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    })
      .then((res) => res.json())
      .then((record) => {
        console.log(record);
        if (record.error) {
          toast.error(record.error, {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={postData}>
          <div className="mb-3">
            <label htmlFor="exampleInputUsername1" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputUsername1"
              aria-describedby="usernameHelp"
              ref={usernameInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputDOB1" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="exampleInputDOB1"
              aria-describedby="dobHelp"
              ref={dobInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              ref={emailInput}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              ref={passwordInput}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;
