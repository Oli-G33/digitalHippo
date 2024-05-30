import { User } from '../payload-types';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { NextRequest } from 'next/server';

export const getServerSideUser = async (
  cookies: NextRequest['cookies'] | ReadonlyRequestCookies
) => {
  try {
    const token = cookies.get('payload-token')?.value;

    if (!token) {
      throw new Error('No token found in cookies');
    }

    const meRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
      {
        headers: {
          Authorization: `JWT ${token}`
        }
      }
    );

    if (!meRes.ok) {
      // Log the status and the text of the response
      const errorText = await meRes.text();
      console.error(
        'API response error:',
        meRes.status,
        meRes.statusText,
        errorText
      );
      throw new Error(`API request failed with status ${meRes.status}`);
    }

    const contentType = meRes.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const errorText = await meRes.text();
      console.error('Unexpected response format:', contentType, errorText);
      throw new Error('Expected JSON response but received different format');
    }

    const { user } = (await meRes.json()) as { user: User | null };
    return { user };
  } catch (error) {
    // Explicitly assert the error type as 'any' or a more specific type
    if (error instanceof Error) {
      console.error('Fetch error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return { user: null };
  }
};
