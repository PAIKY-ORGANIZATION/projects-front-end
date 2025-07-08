// ColorButton.tsx
import React from 'react';

type ButtonColor = 'red' | 'green' | 'blue';
type Widths = 'full' | 'fit';

interface ColorButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: ButtonColor;
  width: Widths;
}

const COLOR_CLASSES: Record<ButtonColor, string> = {
  red:   'bg-red-500 hover:bg-red-700',
  green: 'bg-[#13ae8a] hover:bg-[#68b5a3]',
  blue:  'bg-blue-500 hover:bg-blue-700',
};

const WIDTH_CLASSES: Record<Widths, string> = {
  full:   'w-full',
  fit: 'px-8 w-fit',
};



        //$ You can pass any attribute.
export default function ColorButton({ color, width, className = '', ...rest }: ColorButtonProps) {
  const base = 'cursor-pointer text-white py-2 rounded-md font-bold text-sm self-center';
  const colorClasses = COLOR_CLASSES[color];
  const widthClasses = WIDTH_CLASSES[width]; 

  return (
    <button
      className={`${base} ${colorClasses} ${widthClasses} ${className}`}
      {...rest}
    />
  );
}
