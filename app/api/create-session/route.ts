import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const workflowId = process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID;
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!workflowId || !apiKey) {
      return NextResponse.json(
        { error: 'Missing configuration' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chatkit/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'chatkit_beta=v1',
      },
      body: JSON.stringify({
        workflow_id: workflowId,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI error:', error);
      return NextResponse.json(
        { error: 'Failed to create session' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      client_secret: data.client_secret,
    });
  } catch (error) {
    console.error('Error creating ChatKit session:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}
```

→ **Commit changes**

---

Ho aggiunto la riga:
```
'OpenAI-Beta': 'chatkit_beta=v1',
