/* eslint-disable react/require-default-props */
import { useTheme } from '@material-ui/core';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';
import React, { MouseEvent, ReactNode } from 'react';
import './styles.css';

interface MouseEventTouchRippleEffect {
  // eslint-disable-next-line no-unused-vars
  start: (e: MouseEvent<HTMLButtonElement>) => void;
  // eslint-disable-next-line no-unused-vars
  stop: (e: MouseEvent<HTMLButtonElement>) => void;
}

interface SidebarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  endIcon?: ReactNode;
  startIcon?: ReactNode;
  title?: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  children,
  onClick,
  isActive = false,
  startIcon,
  endIcon,
  title,
}) => {
  const theme = useTheme();
  const activeClassName = isActive ? 'iconActive' : '';
  const rippleRef = React.useRef<MouseEventTouchRippleEffect>(null);
  const onRippleStart = (e: MouseEvent<HTMLButtonElement>) => {
    rippleRef.current?.start(e);
  };
  const onRippleStop = (e: MouseEvent<HTMLButtonElement>) => {
    rippleRef.current?.stop(e);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseDown={onRippleStart}
      onMouseUp={onRippleStop}
      className="flex gap-x-2 items-center py-2 bg-white px-2 rounded-md hover:darken transition-filter"
    >
      {startIcon ? (
        <div className={`${activeClassName} flex items-center`}>
          {startIcon}
        </div>
      ) : (
        <div />
      )}
      <h1
        style={{
          color: isActive ? theme.palette.primary.main : '#000',
          fontWeight: isActive ? 'bold' : 'normal',
        }}
      >
        {title}
      </h1>
      {endIcon ? <div className={activeClassName}>{endIcon}</div> : <div />}
      {children}
      <TouchRipple ref={rippleRef} center={false} />
    </button>
  );
};

export default SidebarButton;
