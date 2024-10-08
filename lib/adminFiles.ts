import prismadb from "./prismadb";

export const addAdminFiles = async (userId: string, fileUrl: string, filename:string) => {
  await prismadb.adminFiles.create({
    data: { 
      userId: userId,
      fileName: filename,
      fileUrl: fileUrl
   },
  });
};

export const deleteAdminFiles = async (fileId: string) => {
  await prismadb.adminFiles.delete({
    where: { 
      id: fileId
   },
  });
};

export const getAllAdminFiles = async (userId: string) => {
  const userFiles = await prismadb.adminFiles.findMany({
    where: {
      userId: "admin",
    },
  });

  return userFiles;
};
