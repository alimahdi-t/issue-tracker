import Pagination from "@/app/components/Pagination";

export default function Home() {
  return <Pagination itemCount={20} pageSize={5} currentPage={1} />;
}
