import s from "./ScrollProgress.module.css";

/** Filet de progression alimenté par `--scroll-progress` (ScrollEngine). */
export default function ScrollProgress() {
  return (
    <div className={s.bar} aria-hidden="true">
      <span className={s.fill} />
    </div>
  );
}
