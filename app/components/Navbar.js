export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-logo">
        <div className="nav-logo-mark">道</div>
        <span>Skilldojo</span>
      </div>

      <div className="nav-actions">
        <button className="btn-ghost">Sign in</button>
        <button className="btn-primary">Start learning →</button>
      </div>
    </nav>
  );
}