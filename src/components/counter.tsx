"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface CounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

export function Counter({
  end,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2,
}: CounterProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <span ref={ref}>
      {inView ? (
        <CountUp
          start={0}
          end={end}
          duration={duration}
          separator=","
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
        />
      ) : (
        "0"
      )}
    </span>
  );
}
