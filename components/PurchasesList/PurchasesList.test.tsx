import { render, screen, userEvent } from "@testing-library/react-native";
import { Purchase } from "../../store/purchases";
import PurchasesList from "./PurchasesList";

test("search filters purchases", async () => {
  const user = userEvent.setup();

  const purchases: Purchase[] = [
    { id: "1", name: "Uber", price: 16.99, createdAt: new Date() },
    { id: "2", name: "Amazon", price: 18.0, createdAt: new Date() },
    { id: "3", name: "Greggs", price: 2.5, createdAt: new Date() },
  ];

  render(<PurchasesList purchases={purchases} />);

  expect(screen.queryByText("Uber")).toBeOnTheScreen();
  expect(screen.queryByText("Amazon")).toBeOnTheScreen();
  expect(screen.queryByText("Greggs")).toBeOnTheScreen();

  const searchButton = screen.getByRole("button", { name: "Search" });
  await user.press(searchButton);

  const searchInput = screen.getByPlaceholderText("Search");
  await user.type(searchInput, "Ub");

  expect(screen.queryByText("Uber")).toBeOnTheScreen();
  expect(screen.queryByText("Amazon")).not.toBeOnTheScreen();
  expect(screen.queryByText("Greggs")).not.toBeOnTheScreen();
});
