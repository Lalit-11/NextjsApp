import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';


const prisma= new PrismaClient();
export async function POST(request){
    try{
    const { name, grade, skills } = await request.json();

   const newEmployee =await prisma.emp.create({
    data:{
        name,
        grade,
        skills
    }
   });
   return NextResponse.json(newEmployee);
   }
   catch(error)
   {
    console.error('Error creating employee:', error);
    return NextResponse.json({ error: 'Error creating employee' }, { status: 500 });
    }
}

export async function GET(request) {
    try {
      // Fetch all employees from the database
      const employees = await prisma.emp.findMany();
      
      return NextResponse.json(employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
      return NextResponse.json({ error: 'Error fetching employees' }, { status: 500 });
    }
  }

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    console.log(id)
    try {
        // Delete the employee by ID
        await prisma.emp.delete({
            where: {
                id: Number(id),
            },
        });

        return NextResponse.json({ message: "Employee Deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting employee:", error);
        return NextResponse.json({ message: "Failed to delete employee" }, { status: 500 });
    } finally {
        await prisma.$disconnect(); 
    }
}
