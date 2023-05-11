import './App.css';
import { Box, Button, Flex, Img, Text } from '@chakra-ui/react';
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import ProtectedRoute from './routing/ProtectedRoute';
import { routes } from './routing/routes';

function App() {
  return (
      <Router>
          <Flex
            w='100%'
            h='100%'
            minH='100vh'
            direction='column'
        >
      <Header></Header>
      <Routes>
        {routes.map((route, index) => {    
          const { path, isProtected, requiredRole, element: Element} = route;
          if (isProtected && requiredRole) {
            return (
              <Route key={index} path={path} element={<ProtectedRoute
                key={index}
                path={path}
                requiredRole={requiredRole}
                element={Element}
              />}/>
            );
          }
          return <Route key={index} path={path} element={Element}/>;
        })}
      </Routes>
      <Footer></Footer>
      </Flex>
    </Router>
  );
}

export default App;
