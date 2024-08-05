import ReactDOM from 'react-dom';

const ToastPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (typeof window === 'undefined') return null;

  return ReactDOM.createPortal(
    children,
    document.body
  );
};

export default ToastPortal;