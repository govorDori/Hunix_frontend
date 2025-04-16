import { render } from '@testing-library/react';
import { MemoryRouter, createMemoryRouter } from 'react-router-dom';
// import { CarContext } from '../utility/CarContext';
import { UserContext } from '../utility/UserContext';
import App from '../App';
import { NotFound } from '../pages/NotFound'
import { RouterProvider } from 'react-router-dom';
import { expect } from 'vitest';
import { screen } from '@testing-library/react'

describe('App Component', () => {
 /* it('renders without crashing', () => {

    const mockUser = { name: 'Test User', email: 'test@example.com' };
    // const mockCars = [];

    render(
      <UserContext.Provider value={{ user: mockUser }}>
          <MemoryRouter initialEntries={["/"]} >
            <App />
          </MemoryRouter>
       </UserContext.Provider>
    );
  });*/

  it("renders NotFound page for unknown routes", ()=>{
	const testRouter = createMemoryRouter([
		{ path: '*', element: <NotFound /> },
	],
	{initialEntries:['/randomPage']}
	);
	render(
		<RouterProvider router={testRouter} />
	);
	expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
  })
});
