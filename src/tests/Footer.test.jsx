import React from 'react';
import { expect, describe, it } from "vitest";
import { Footer } from "../components/Footer";
import { screen, render } from "@testing-library/react";

beforeAll(() => {
	global.IntersectionObserver = class {
	  constructor() {}
	  observe() {}
	  unobserve() {}
	  disconnect() {}
	};
  });

  

describe("Footer Component Tests", ()=>{
	it("renders without crashing",()=>{
		render(<Footer />)
		expect(screen.getByText(/elérhetőségek/i)).toBeInTheDocument();
	})

	it("renders all author's contacts",()=>{
		render(<Footer />)
		expect(screen.getAllByText(/email/i).length).toBe(3);
	})


})