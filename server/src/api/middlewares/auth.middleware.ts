import { Context } from "elysia";

export const authMiddleware = async (ctx: Context & { userId?: string }) => {
  const { jwt, headers, set } = ctx;

  const auth = headers.authorization;
  if (!auth) {    
    set.status = 401;
    return {
      message: 'Unauthorized'
    };
  }

  const token = auth.replace("Bearer ", "");
  const payload = await jwt.verify(token);

  if (!payload) {    
    set.status = 401;
    return {
      message: 'Unauthorized'
    };;
  }

  ctx.userId = payload.userId;
};