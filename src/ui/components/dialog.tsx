type DialogParams = {
  open: boolean;
  header?: string;
  onClick?: () => void;
  footer?: string;
  children: any;
};

export const Dialog = ({
  children,
  open,
  header,
  footer,
  onClick,
}: DialogParams) => (
  <dialog open={open}>
    {header && (
      <header>
        <h3>{header}</h3>
      </header>
    )}
    {children}

    {onClick && (
      <footer>
        <button onClick={onClick}>{footer}</button>
      </footer>
    )}
  </dialog>
);
