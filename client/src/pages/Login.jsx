import { LoginForm } from "../components/LoginForm";

export function Login() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-lg font-medium">Test Login Information:</h1>
        <div>
          Email: <span className="italic">tester@gmail.com</span>
        </div>
        <div>
          Password: <span className="italic">Tester123</span>
        </div>
        <LoginForm />
      </div>
    </>
  );
}
