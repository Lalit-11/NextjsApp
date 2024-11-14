"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditEmpForm({id,  name, grade, skills}){
  const [newName , setNewName]= useState(name);
  const [newGrade , setNewGrade]= useState(grade);
  const [newSkill , setNewSkill]= useState(skills);
  const router= useRouter();

  const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
      const res=  await fetch(`http://localhost:3000/api/employee/${id}`,{
        method: "PUT",
        headers:{
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name: newName, grade: newGrade, skills: newSkill }),
    });
    if(!res.ok){  
       throw new Error("failed to update Employee");
    }
   router.refresh();
   router.push("/")
  }
  catch(error){
   console.log(error);
  }};
      return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e)=> setNewName(e.target.value)}
            value={newName}
            className="border border-slate-500 px-8 py-2 text-black"
            type="text"
            placeholder="Update Name"
          />
          <input
            onChange={(e)=> setNewGrade(e.target.value)}
            value={newGrade}
            className="border border-slate-500 px-8 py-2 text-black"
            type="text" color="black"
            placeholder="Update Grade"
          />
          <input
            onChange={(e)=> setNewSkill(e.target.value)}
            value={newSkill}
            className="border border-slate-500 px-8 py-2 text-black"
            type="text"
            placeholder="Update Skills"
          />
          <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
              Update Employee
          </button>
        </form>
      );
}