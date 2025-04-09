import { getClient } from '@/src/configs/apollo';
import { MyMotorcyclesDocument, MyMotorcyclesQueryResponse } from '@/src/graphql/queries/myMotorcycles.generated';
import { getTokenServer } from '@/src/utils/get-token-server.util';

export const myMotorCyclesServerQuery = async () => {
  const token = await getTokenServer();
  if (!token) {
    return {
      data: {
        myMotorcycles: {
          items: [],
        },
      },
    };
  }

  const client = await getClient();
  return await client.query<MyMotorcyclesQueryResponse>({
    query: MyMotorcyclesDocument,
    context: {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    },
  });
};
