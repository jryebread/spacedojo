import Head from 'next/head'
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
export default function Home() {
  const [emailFinal, setEmailFinal] = useState("engineer@amazon.com");
  var [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Invalid Email.");
  const [success, setSuccess] = useState(false);

  const saveEmail = (email) => {
    fetch('https://buakgmuq9j.execute-api.us-east-2.amazonaws.com/prod/submitemail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailAddress: email, // Use your own property name / key
      }),
    }, {mode: 'cors'})
      .then((res) => console.log(res.json()))
      .catch((err) => console.log('error'))
  }

  const onFormSubmit = ( e ) => {
    e.preventDefault();
    // don't remember from where i copied this code, but this works.
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries())
    console.log(formDataObj)
    var email = formDataObj.myInput;
    console.log("email:", email)
    if ( re.test(email) ) {
      setEmailFinal(email)
      setShowError(false)
      setSuccess(true)
      saveEmail(email)
        // this is a valid email address
        // call setState({email: email}) to update the email
        // or update the data in redux store.
    }
    else {
      console.log("ERROR")
      setShowError(true)
      setEmailFinal("")
        // invalid email, maybe show an error to the user.
    }

}
  return (
    <div className="container">
      <Head>
        <title>SpaceDojo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 color="white" className="title">
         SpaceDojo
        </h1> <br></br>
        <iframe src='https://my.spline.design/emojirocketcopy-00753ec739859a42638ed73ab8aca380/' frameborder='0' width='100%' height='400px'></iframe>
                                                <p className="description">
          System design mock interviews with other real engineers
        </p>

        <br></br> <br></br> 

        <b>
        <p className="description">
          Join the FREE community 
        </p></b>


        {/* <div className="grid">
          <a href="https://nextjs.org/docs" className="card">
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className="card">
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>
                    <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className="card"
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="card"
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}

        {!success ? <>
        <Form onSubmit={onFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">

          <FormControl type="text" name="myInput" placeholder="engineer@amazon.com"
 aria-label="Large" aria-describedby="inputGroup-sizing-lg" />
        </Form.Group>
        <center><Button type="submit">Join</Button></center>

        </Form>

        {showError == true ? <p>{errorMsg}</p> : <></>}
        </>
        : <p> Welcome! We'll be in touch shortly</p> }
        {/* <small> <i>The super secret discord server link will be sent to your work email to verify your job status</i>
        </small> */}

      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
