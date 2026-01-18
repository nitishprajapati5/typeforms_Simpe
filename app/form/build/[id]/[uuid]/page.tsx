
import prisma from "@/app/_DatabaseConfiguration/dbConfig";
import UUIDClient from "./_Components/UUIDClient";
import { redirect } from "next/navigation";

interface UUIDPageProps {
  params :Promise<{uuid:string}>;
}

export default async function UUIDPage({params}:UUIDPageProps){
  const {uuid} = await params;

  const getWorkSpaceId = await prisma.formData.findUnique({
    where:{
      formId:uuid
    }
  })


  console.log(getWorkSpaceId?.id)

  if(!getWorkSpaceId){
    redirect("/login")
  }

const data = await prisma.formData.findUnique({
  where: {
    formId: uuid 
  },
  include: {
    formDesign: true,
    formSettings: true,
    headerConfig: true,
    questions: true  
  }
});

if(!data){
  redirect("/login")
}
  console.log("data from backend",data)

  return (
    <UUIDClient 
      uuid={uuid} 
      data={data}
    />
  )
}