// MenuContainer.js
import { useLocation } from 'react-router-dom';
import Menu from "./NavBar";

function MenuContainer() {
  const location = useLocation();

  // Determine whether to show the menu based on the current route
  const showMenu = location.pathname !== '/';

  return showMenu ? <Menu /> : null;
}

export default MenuContainer;
