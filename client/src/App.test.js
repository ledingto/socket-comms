import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import axios from "axios";

jest.mock("axios");

test("renders data from API", async () => {
  axios.get.mockResolvedValue({ data: { message: "Mocked response" } });

  render(<App />);

  await waitFor(() => expect(screen.getByText(/Mocked response/i)).toBeInTheDocument());
});