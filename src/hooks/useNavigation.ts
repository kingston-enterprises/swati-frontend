import { useNavigate } from 'react-router-dom';

// Define an interface for the navigation functions
interface Navigation {
  navigateTo(path: string): void;
  replace(path: string): void;
  push(path: string, state: any): void;
}

// Create the facade using a custom hook
function useNavigation(): Navigation {
  const navigate = useNavigate();

  // Wrap `navigate` functions for potential enhancements
  const navigateTo = (path: string) => { navigate(path);}
  const replace = (path: string) => navigate(path, { replace: true });
  const push = (path: string, state: any) => navigate(path, state ); // Optionally add state

  return { navigateTo, replace, push };
}

export default useNavigation;
