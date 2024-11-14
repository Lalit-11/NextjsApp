import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 py-3">
      <Link className="text-white font-bold" href={"/"}>
        Emoloyee Management
      </Link>
      <Link className="text-white font-bold p-2" href={"/addEmp"}>
        Add Employee
      </Link>
    </nav>
  );
}