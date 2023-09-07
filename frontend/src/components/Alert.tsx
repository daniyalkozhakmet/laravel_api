// import React, { useState, useEffect, useRef } from "react";
// export const Alert = ({
//   className,
//   message,
// }: {
//   className: string;
//   message: string;
// }) => {
//   const timerRef = React.useRef<number>();
//   let show: boolean = true;
//   let content: JSX.Element | null = (
//     <div className={`alert alert-${className}`} role="alert">
//       {message}
//     </div>
//   );
//   const sendMessage = () => {
//     if (timerRef) console.log(timerRef);
//     timerRef.current = setTimeout(() => {
//       show = false;
//     }, 3000);
//   };

//   useEffect(() => {
//     // Clear the interval when the component unmounts
//     console.log(show);
//     return () => clearTimeout(timerRef.current);
//   }, []);

//   sendMessage();
//   return show ? content : null;
// };

import React, { useState, useEffect, useRef } from "react";
export const Alert = ({
  className,
  message,
}: {
  className: string;
  message: string;
}) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, []);
  let content: JSX.Element | null = <div className={className}>{message}</div>;

  return show ? content : null;
};
