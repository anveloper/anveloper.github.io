import Link from "next/link";
import styles from "./styles/Navigation.module.css";

const links = [
  { label: "안성진", path: "/" },
  { label: "포스트", path: "/post" },
  { label: "프로젝트", path: "/project" },
  { label: "취미", path: "/lego" },
];
const Navigation = () => {
  return (
    <div className={styles.navigation}>
      {links.map(({ label, path }, idx) => {
        return (
          <Link key={idx} href={path}>
            {label}
          </Link>
        );
      })}
    </div>
  );
};

export default Navigation;
