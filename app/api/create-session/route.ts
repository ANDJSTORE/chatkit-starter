import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
  try {
    const workflowId = process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID;
    
    if (!workflowId) {
      return NextResponse.json(
        { error: 'Workflow ID not configured' },
        { status: 500 }
      );
    }

    const session = await openai.chatkit.sessions.create({
      workflow_id: workflowId,
    });

    return NextResponse.json({
      client_secret: session.client_secret,
    });
  } catch (error) {
    console.error('Error creating ChatKit session:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}
