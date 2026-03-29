import { CommonSizeVariants, type CommonIconInterface } from "./CommonVariants";

export const BrainIcon = (props: CommonIconInterface) => {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={CommonSizeVariants[props.size]}
    >
      <polygon
        points="32 7 28 7 28 3 14 3 14 9 7 9 7 17 3 17 3 47 7 47 7 55 14 55 14 61 28 61 28 57 32 57 32 7"
        fill="#42ff58"
      />
      <polygon
        points="32 7 36 7 36 3 50 3 50 9 57 9 57 17 61 17 61 47 57 47 57 55 50 55 50 61 36 61 36 57 32 57 32 7"
        fill="#fe4343"
      />
      <path
        d="M38.8,33.848l2-.711V30.863l-2-.711L38.119,28.5l.912-1.921-1.607-1.607-1.921.912L33.848,25.2l-.711-2H30.863l-.711,2-1.655.686-1.921-.912-1.607,1.607.912,1.921L25.2,30.152l-2,.711v2.274l2,.711.686,1.655-.912,1.921,1.607,1.607,1.921-.912,1.655.685.711,2h2.274l.711-2,1.655-.685,1.921.912,1.607-1.607L38.119,35.5ZM32,35a3,3,0,1,1,3-3A3,3,0,0,1,32,35Z"
        fill="#0967b3"
      />
    </svg>
  );
};