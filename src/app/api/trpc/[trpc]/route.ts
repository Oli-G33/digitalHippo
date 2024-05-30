import { appRouter } from '@/trpc';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = async (req: Request) => {
  const response = await fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    // @ts-expect-error context is passed from Express middleware
    createContext: () => ({})
  });

  return new Response(response.body, {
    status: response.status,
    headers: response.headers
  });
};

export { handler as GET, handler as POST };
