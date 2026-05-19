"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession, login, logout } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function signupUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) throw new Error("Missing fields");

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email already exists");

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, passwordHash },
  });

  await login(user.id);
  redirect("/");
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) throw new Error("Missing fields");

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("Invalid credentials");

  await login(user.id);
  redirect("/");
}

export async function logoutUser() {
  await logout();
  redirect("/login");
}

export async function addTransaction(formData: FormData) {
  const amount = parseFloat(formData.get("amount") as string);
  const type = formData.get("type") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;

  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  if (!amount || !type || !category) {
    throw new Error("Missing required fields");
  }

  await prisma.transaction.create({
    data: {
      amount,
      type,
      category,
      description: description || "",
      date: new Date(),
      userId: session.userId,
    },
  });

  revalidatePath("/");
  revalidatePath("/analytics");
}

export async function addGoal(formData: FormData) {
  const name = formData.get("name") as string;
  const targetAmount = parseFloat(formData.get("targetAmount") as string);

  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  if (!name || !targetAmount) {
    throw new Error("Missing required fields");
  }

  await prisma.goal.create({
    data: {
      name,
      targetAmount,
      currentAmount: 0,
      icon: "target",
      userId: session.userId,
    },
  });

  revalidatePath("/goals");
}
