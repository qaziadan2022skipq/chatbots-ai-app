import prismadb from "./prismadb";

export const addFiles = async (userId: string, fileUrl: string, filename:string) => {
  await prismadb.userFiles.create({
    data: { 
      userId: userId,
      fileName: filename,
      fileUrl: fileUrl
   },
  });
};

export const getAllFiles = async (userId: string) => {
  const userFiles = await prismadb.userFiles.findMany({
    where: {
      userId: userId,
    },
  });

  return userFiles;
};
