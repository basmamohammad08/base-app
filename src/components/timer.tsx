import * as React from "react";

export type TimerRef = {
  resetTimer: () => void;
};

type Props = {
  timerInitalValue: number;
  children: (
    timer: number,
    setTimer: React.Dispatch<React.SetStateAction<number>>,
  ) => React.ReactNode;
};

export const TimerCmp = React.forwardRef<TimerRef, Props>((props, ref) => {
  const intervalId = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const [timer, setTimer] = React.useState(props.timerInitalValue);

  React.useEffect(() => {
    if (timer !== props.timerInitalValue) return;

    intervalId.current = setInterval(() => {
      setTimer((timer) => {
        const value = timer - 1;
        if (value === 0) clearInterval(intervalId.current!);
        return value;
      });
    }, 1000);
  }, [timer, props.timerInitalValue]);

  React.useEffect(() => {
    return () => clearInterval(intervalId.current!);
  }, []);

  React.useImperativeHandle(
    ref,
    () => ({
      resetTimer: () => {
        clearInterval(intervalId.current!);
        setTimer(props.timerInitalValue);
      },
    }),
    [props.timerInitalValue],
  );

  return props.children(timer, setTimer);
});

export const Timer = React.memo(TimerCmp);
