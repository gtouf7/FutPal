// MAIN LANDING PAGE
import Link from 'next/link';
import styles from "./page.module.css";


export default function Home() {
  return (
    <div>
      <h1>Welcome to FutPal</h1>
      <p>BECOME a top class manager. CREATE your dream team. CONQUER the league.</p>
      {/* Login button */}
      <Link href="/login">
        <button>Play now</button>
      </Link>
    </div>
  );
}
