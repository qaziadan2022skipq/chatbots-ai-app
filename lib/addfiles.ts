import prismadb from "./prismadb";

export const addFiles = async (userId: string, newFile: string) => {
  const userFiles = await prismadb.userFiles.findUnique({
    where: {
      userId: userId,
    },
  });

  if (userFiles) {
    let allFiles = userFiles?.count;
    allFiles?.push(newFile);

    await prismadb.userFiles.update({
      where: {
        userId: userId,
      },
      data: {
        count: allFiles,
      },
    });
  } else {
    await prismadb.userFiles.create({
        data: { userId: userId, count: [newFile] },
      });
  }
};


export const getAllFiles = async (userId: string) => {
    const userFiles = await prismadb.userFiles.findUnique({
      where: {
        userId: userId,
      },
    });
  
    return userFiles?.count
  };
  
  
  