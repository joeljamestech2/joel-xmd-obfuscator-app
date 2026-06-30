import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Basic mockup authentication check mirroring Image 3 login schema
  if (username === 'admin' && password === 'password123') {
    const response = NextResponse.json({ success: true, user: { name: 'Joel API Account' } });
    
    // Set cookie token for session preservation
    response.cookies.set('session_token', 'secure-jwt-token-string', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    return response;
  }

  return NextResponse.json({ success: false, message: 'Invalid Credentials' }, { status: 401 });
}
