import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <main className="page">
    <header className="page-header">
      <h1>Page not found</h1>
      <p>That address is not part of Clinica.</p>
    </header>
    <p>
      <Link to="/dashboard">Return to dashboard</Link>
    </p>
  </main>
);

export default NotFoundPage;
