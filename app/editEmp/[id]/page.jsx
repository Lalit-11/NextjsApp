import EditEmpForm from "@/components/EditEmpForm";

const getEmpById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/employee/${id}`, {
            cache: "no-store"
        });

        if (!res.ok) {
            throw new Error("Failed to fetch Employee");
        }

        return await res.json(); 
    } catch (error) {
        console.log(error);
        return null; 
    }
};

export default async function editEmp({ params }) {
    const { id } =await params;

   
    const emp = await getEmpById(id);

    
    if (!emp) {
        return <div>Error: Employee data not found</div>;
    }
    

    const { name, grade, skills } = emp;

    return <EditEmpForm id={id} name={name} grade={grade} skills={skills} />;
}
