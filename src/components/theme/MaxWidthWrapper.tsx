import React from "react";

type MaxWidthWrapperProps = {
  children: React.ReactNode;
};
const MaxWidthWrapper = ({ children }: MaxWidthWrapperProps) => {
  return <div className="max-w-7xl mx-auto px-4">{children}</div>;
};

export default MaxWidthWrapper;
