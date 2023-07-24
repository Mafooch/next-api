import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";
const API_KEY: string = process.env.API_KEY as string;

export async function GET() {
  const res = await fetch(DATA_SOURCE_URL);

  const todos: Todo[] = await res.json();

  return NextResponse.json(todos);
}

export async function DELETE(request: Request) {
  const { id }: Pick<Todo, 'id'> = await request.json();

  if (!id) return NextResponse.json({ message: "Todo id required" })

  await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'API-Key': API_KEY
    }
  });

  return NextResponse.json({ message: `Todo ${id} deleted` });
}

export async function POST(request: Request) {
  const { userId, title }: Pick<Todo, 'title' | 'userId'> = await request.json();

  if (!userId || !title) return NextResponse.json({ message: "Missing required data" })

  const res = await fetch(DATA_SOURCE_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'API-Key': API_KEY
    },
    body: JSON.stringify({ userId, title, completed: false })
  });

  const newTodo: Todo = await res.json();

  return NextResponse.json(newTodo);
}

export async function PUT(request: Request) {
  const { userId, title, id, completed }: Todo = await request.json();

  if (!userId || !title || !id || typeof (completed) !== 'boolean') return NextResponse.json({ message: "Missing required data" })

  const res = await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'API-Key': API_KEY
    },
    body: JSON.stringify({ userId, title, completed })
  });

  const updatedTodo: Todo = await res.json();

  return NextResponse.json(updatedTodo);
}