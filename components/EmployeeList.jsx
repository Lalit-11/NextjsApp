import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";


const getEmployee = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/employee", { cache: "no-store" });
    
    if (!res.ok) {
      throw new Error("Failed to fetch employee");
    }

    const data = await res.json();
    console.log("Fetched Employee Data:", data); 
    return data;
  } catch (error) {
    console.log("Error loading employees", error);
    return null; 
  }
};

export default async function EmpList() {
  const employees = await getEmployee();

  
  if (!employees || employees.length === 0) {
    return <p>No employees found or failed to load employees.</p>;
  }

  return (
    <>
      {employees.map((e) => ( 
        <div
          key={e.id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
          
          <div>
            <h2 className="font-bold text">{e.id}</h2>
          </div>
          <div>
            <h2 className="font-bold text">{e.name}</h2>
          </div>
          <div>
            <h2 className="font-bold text">{e.grade}</h2>
          </div>
          <div>
            <h2 className="font-bold text">{e.skills}</h2>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id= {e.id}/>
            <Link href={`/editEmp/${e.id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
