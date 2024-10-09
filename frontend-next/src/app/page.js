// MAIN LANDING PAGE
import Link from 'next/link';
import styles from "./page.module.css";


export default function Home() {
  return (
    <div className={styles.main}>
      <img src="./futpal-logo-text.png" alt="FutPal logo"></img>
      <div className={styles.startingTxT}>
        <p>BECOME a top class manager.</p>
        <p>CREATE your dream team.</p>
        <p>CONQUER the league.</p>
      </div>
      {/* Login button */}
      <Link href="/login">
        <button className={styles.actionBtn}>Play now</button>
      </Link>
      <div className={styles.info}>
        <h2 className={styles.special}>What's FUTPAL?</h2>
        <p>Ever dreamt of playing the perfect football management simulator?
          Where you don't have to worry about having to play 60 games per season?
          A game that lets you play a manager's career in your own terms?
          That game is FUTPAL!
          Sign up today and start exploring your football managing skills!
        </p>
      </div>
      <div>
        <h2>What are FUTPAL's features?</h2>
        <div>
          <img src="./team-badge.png" alt="An image of a round team badget with yellow lines and a star."></img>
          <p>Create your own club or manage your favorite team in a competitive online league.
          Test your coaching skills in a custom league and play against the computer.
          </p>
        </div>
        <div>
          <p>Customize your team’s formations and playstyle. Bring the best out of your players and win the league.</p>
          <img src="./stadium.png" alt="An image of soccer tactics on a field"></img>
        </div>
        <div>
          <img src="./coin.png" alt="An image of the FutPal in-game currency"></img>
          <p>Play games and earn FutBux(Φ), FUTPAL's in-game currency. Use your FutBux to buy players and upgrade your club.</p>
        </div>
      </div>
      <h1>Join FUTPAL, your football pal!</h1>
      <Link href="/login">
        <button className={styles.actionBtn}>Play Now</button>
      </Link>
      <footer>
        <h2>FUTPAL</h2>
        <p>Georgios Toufexis © Copyright 2024, All Rights Reserved</p>
      </footer>
    </div>
  );
}
