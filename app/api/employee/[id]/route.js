import {NextResponse} from 'next/server';
import {PrismaClient} from '@prisma/client';
import EmpList from '@/components/EmployeeList';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    // Access the employee ID from params without awaiting
    const { id } =await params;
    console.log(id);
    // Fetch the employee by ID using findUnique
    const employee = await prisma.emp.findUnique({
      where: { id: parseInt(id) }, 
      select: {
        name: true,
        grade: true,
        skills: true,
      },
    });

  
    if (!employee) {
      return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }

    
    return NextResponse.json(employee, { status: 200 });
  } catch (error) {
    console.error("Error fetching employee by ID:", error);
    return NextResponse.json({ error: "Error fetching employee" }, { status: 500 });
  }
}
export async function PUT(request, { params }) {
    try {
      const { id } = await params; 
    
      const data = await request.json();
      const { name, grade, skills } = data;
  
      
      const updatedEmployee = await prisma.emp.update({
        where: { id: parseInt(id) }, 
        data: {
          name,
          grade,
          skills,
        },
      });
  
      return NextResponse.json(updatedEmployee, { status: 200 });
    } catch (error) {
      console.error("Error updating employee by ID:", error);
      return NextResponse.json({ error: "Error updating employee" }, { status: 500 });
    }
  }
  

