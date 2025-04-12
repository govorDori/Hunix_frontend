import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CarContext } from '../utility/CarContext';
import { UserContext } from '../utility/UserContext';
import App from '../App';

describe('App Component', () => {
  it('renders without crashing', () => {

    const mockUser = { name: 'Test User', email: 'test@example.com' };
    const mockCars = [];

    render(
      <UserContext.Provider value={{ user: mockUser }}>
       <CarContext.Provider value={{ cars: mockCars }}>
          <MemoryRouter>
            <App />
          </MemoryRouter>
         </CarContext.Provider>
       </UserContext.Provider>
    );
  });
});
