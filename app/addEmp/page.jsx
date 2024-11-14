"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddEmp(){
  const [name, setName]= useState("");
  const [grade, setGrade]= useState("");
  const [skills, setSkills]=useState("");
  
  const router = useRouter();
  const handleSubmit= async (e)=>{
   e.preventDefault();

   if(!name || !grade || !skills){
    alert("Please enter valid inputs");
    return;
   }

   try{
    const res= await fetch("http://localhost:3000/api/employee",{
      method: "POST",
      headers:{
        "Content-type": "application/json"
      },
      body: JSON.stringify({name,grade,skills}),
    });

    if(res.ok){
      router.push('/');

    }
    else{
      throw new Error("Failed to add Employee details");
    }
   }
   catch(error){
     console.log(error);
   }
  };
    return (
        <form  onSubmit ={handleSubmit} className="flex flex-col gap-3">
          <input
            onChange={(e)=> setName(e.target.value)}
            value ={name}
            className="border border-slate-500 px-8 py-2 text-black"
            type="text"
            placeholder="Enter Name"
          />
          <input
          onChange={(e)=> setGrade(e.target.value)}
          value ={grade}
            className="border border-slate-500 px-8 py-2 text-black"
            type="text"
            placeholder="Enter Grade"
          />
          <input
            onChange={(e)=> setSkills(e.target.value)}
            value ={skills}
            className="border border-slate-500 px-8 py-2 text-black"
            type="text"
            placeholder="Enter Skills"
          />
          <button type="submit" className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
              Add Employee
          </button>
        </form>
      );
}