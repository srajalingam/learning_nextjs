import { NextRequest } from "next/server";
import { comments } from "./data";

export async function GET(request:NextRequest){
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    if (query) {
        const filteredComments = comments.filter(comment => 
            comment.text.toLowerCase().includes(query.toLowerCase())
        );
        return Response.json(filteredComments);
    } else {
        return Response.json(comments);
    }
}

export async function POST(request: Request) {
    const data = await request.json();
    const newComment = {
        id: `c${comments.length + 1}`,
        text: data.text,
    };
    comments.push(newComment);
    return Response.json(newComment, 
        { 
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        }
    );
}