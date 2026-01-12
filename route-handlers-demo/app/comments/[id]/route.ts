import { comments } from "../data";

export async function GET(
    request: Request, 
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const commentId = id;
    // In a real application, you would fetch the comment from a database
    const comment = comments.find(c => c.id === commentId);
    if (comment) {
        return Response.json(comment);
    } else {
        return new Response("Comment not found", { status: 404 });
    }
}


export async function PATCH(
    request: Request, 
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const commentId = id;
    const data = await request.json();
    const comment = comments.find(c => c.id === commentId);
    if (comment) {
        comment.text = data.text || comment.text;
        return Response.json(comment);
    } else {
        return new Response("Comment not found", { status: 404 });
    }
}

export async function DELETE(
    request: Request, 
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const commentId = id;
    const commentIndex = comments.findIndex(c => c.id === commentId);
    const deletedComment = comments[commentIndex];
    if (commentIndex > -1) {
        comments.splice(commentIndex, 1);
        return Response.json(deletedComment);
    } else {
        return Response.json("Comment not found", { status: 404 });
    }
}


