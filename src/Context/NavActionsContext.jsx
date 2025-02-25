import { createContext, useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom"; // Requires React Router

export const NavActionsContext = createContext();

export default function NavActionsProvider({ children }) {
  const [search, setSearch] = useState("");
  const [searchPaths, setSearchPaths] = useState(new Set());
  const location = useLocation(); // Get current path from React Router

  // Stable search handler
  const handleSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  // Memoized displaySearch with cleanup
  const displaySearch = useCallback(() => {
    const path = location.pathname;
    setSearchPaths(prev => new Set([...prev, path]));
    
    // Return cleanup that removes ONLY the current path's registration
    return () => {
      setSearchPaths(prev => {
        const next = new Set(prev);
        next.delete(path);
        return next;
      });
    };
  }, [location.pathname]); // Only recreate when path changes

  // Clear search when leaving allowed paths
  useEffect(() => {
    if (!searchPaths.has(location.pathname)) {
      setSearch("");
    }
  }, [location.pathname, searchPaths]);

  return (
    <NavActionsContext.Provider value={{
      search,
      handleSearch,
      displaySearch,
      shouldShowSearch: searchPaths.has(location.pathname)
    }}>
      {children}
    </NavActionsContext.Provider>
  );
}