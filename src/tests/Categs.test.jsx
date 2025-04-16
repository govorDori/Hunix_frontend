import React from 'react';
import { expect, describe, it } from "vitest";
import { Categs } from "../components/Categs";
import { screen, render } from "@testing-library/react";

beforeAll(() => {
	global.IntersectionObserver = class {
	  constructor() {}
	  observe() {}
	  unobserve() {}
	  disconnect() {}
	};
  });

  

describe("Categs Component Tests", ()=>{
	it("renders without crashing",()=>{
		render(<Categs />)
		expect(screen.getByText(/felkapott márkák/i)).toBeInTheDocument();
	})

	//ideiglenes
	it("renders all brands",()=>{
		render(<Categs />)
		expect(screen.getAllByText(/márka/i).length).toBe(10);
	})


})