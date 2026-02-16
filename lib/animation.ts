import type { Variants } from "motion/react";

/** 홈페이지 섹션용: 스크롤 진입 시 등장 */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

/** 리스트 컨테이너용: children stagger (필요한 곳에만 제한적 사용) */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/** 리스트 아이템용 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};
