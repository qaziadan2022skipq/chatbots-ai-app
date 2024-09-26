import prismadb from "./prismadb";

export const checkProUser = async (userId: string) => {
  const user = await prismadb.proUsers.findUnique({
    where: {
      userId: userId,
    },
  });
  if (user) {
    return true;
  } else {
    return false;
  }
};

export const allowUser = async (userId: string) => {
  await prismadb.proUsers.create({
    data: {
      userId: userId
    }
  });
};

export const blockUser = async (userId: string) => {
  await prismadb.proUsers.delete({
    where: {
      userId: userId
    }
  });
};


