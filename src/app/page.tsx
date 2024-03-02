import { SiJira } from "react-icons/si";
import "./page.module.scss";

export default function Home() {
  return (
    <main className="home">
      <h1 className="home__title">
        <SiJira className="home__logo" fill="rgb(61, 109, 252)" size={"84px"} />
        Jria
      </h1>
      <p className="home__description">Build your dream project with us!</p>
    </main>
  );
}
