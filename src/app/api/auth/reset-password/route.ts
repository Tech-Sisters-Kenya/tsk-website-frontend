import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, current_password, new_password } = await request.json();

    const response = await fetch('https://api.techsisterskenya.org/api/auth/password/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        current_password,
        password: new_password,
        password_confirmation: new_password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to reset password' },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
