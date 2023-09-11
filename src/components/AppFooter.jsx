import styles from "./AppFooter.module.css";

export default function AppFooter() {
  return (
    <div className={styles.footer}>
      <p className={styles.copyright}>
        CopyRight &copyright; {new Date().getFullYear()} By WorldWise
      </p>
    </div>
  );
}
