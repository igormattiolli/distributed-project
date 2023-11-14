import ListOrder from "./components/listOrders";

export const revalidate = 5 * 60;

export default async function Home() {
  return (
    <>
      <ListOrder />
    </>
  );
}
