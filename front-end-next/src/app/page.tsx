import { Header } from "./components/components/Header";
import { TaskList } from "./components/components/TaskList";
import ListOrder from "./components/listOrders";
import './styles/global.scss'

export const revalidate = 5 * 60;

export default async function Home() {
  return (
    <>
      {/* <ListOrder /> */}
      <Header />
      <TaskList />
    </>
  );
}
